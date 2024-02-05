import type {BaseColor} from './colors';
import {
  getColor,
  getRadixColor,
  getNaturalGray,
  getSolidTextColor,
} from './colors';
import {generateTokenColors} from './token-colors-gen';

interface ITheme {
  name: string;
  colors: Record<string, any>;
  tokenColors: Array<Record<string, any>>;
}

export interface IOptions {
  primary: BaseColor;
  secondary: BaseColor;
  dark: boolean;
  colorful: boolean;
}

export function generate(name: string, opts: IOptions): string {
  const o: ITheme = {name, colors: {}, tokenColors: []};
  pipeline(o, opts);
  return JSON.stringify(o, null, 2);
}

function pipeline(o: ITheme, opts: IOptions) {
  const {primary, secondary, dark, colorful} = opts;
  const primaryGray = getNaturalGray(primary);

  o.colors = {
    // Base
    foreground: getRadixColor(primaryGray, 11, dark),
    focusBorder: getRadixColor(primary, 8, dark),
    'selection.background': getRadixColor(primary, 5, dark),
    'icon.foreground': getColor(primary, 11, dark, colorful),

    // Button
    'button.foreground': getSolidTextColor(primary, 12, colorful),
    'button.background': getRadixColor(primary, 9, dark),
    'button.hoverBackground': getRadixColor(primary, 10, dark),
    'button.secondaryForeground': getSolidTextColor(secondary, 12, colorful),
    'button.secondaryBackground': getRadixColor(secondary, 9, dark),
    'button.secondaryHoverBackground': getRadixColor(secondary, 10, dark),

    // Input
    'input.background': getColor(primary, 2, dark, colorful),
    'input.foreground': getColor(primary, 11, dark, colorful),
    'input.border': getRadixColor(primaryGray, 7, dark),
    'inputOption.activeBackground': getRadixColor(primary, 9, dark),
    'inputOption.activeForeground': getSolidTextColor(primary, 12, colorful),
    'inputOption.hoverBackground': getRadixColor(primary, 3, dark),

    // Editor
    'editor.foreground': getColor(primary, 11, dark, colorful),
    'editor.background': getColor(primary, 2, dark, colorful),

    // ActivityBar
    'activityBar.foreground': getColor(primary, 11, dark, colorful),
    'activityBar.background': getColor(primary, 2, dark, colorful),

    // SideBar
    // 'sideBar.foreground': getRadixColor(primaryGray, 11, dark),
    'sideBar.background': getColor(primary, 2, dark, colorful),

    // EditorGroups and Tabs
    'editorGroupHeader.tabsBackground': getColor(primary, 2, dark, colorful),
    'tab.activeForeground': getColor(primaryGray, 12, dark, colorful),
    'tab.activeBackground': getRadixColor(primary, 3, dark),
    'tab.activeBorderTop': getRadixColor(primary, 9, dark),
    'tab.inactiveForeground': getColor(primaryGray, 11, dark, colorful),
    'tab.inactiveBackground': getColor(primary, 1, dark, colorful),

    // TitleBar
    'titleBar.activeForeground': getRadixColor(primaryGray, 11, dark),
    'titleBar.activeBackground': getColor(primary, 1, dark, colorful),
  };

  o.tokenColors.push(
    ...generateTokenColors({
      foreground: getRadixColor(primaryGray, 11, dark),
      variables_and_properties: getRadixColor(primaryGray, 11, dark),
      keywords: getRadixColor(primaryGray, 11, dark),
      comments: getRadixColor(primaryGray, 8, dark),
      classes_and_constants: getRadixColor(primary, 11, dark),
      functions_and_methods: getRadixColor(primary, 11, dark),
      numbers: getRadixColor(secondary, 11, dark),
      strings: getRadixColor(secondary, 11, dark),
      operators_and_special_functions: getRadixColor(secondary, 11, dark),
    })
  );
}
