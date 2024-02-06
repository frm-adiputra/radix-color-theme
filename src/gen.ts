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

  const surface01 = getColor(primaryGray, 3, dark, colorful);
  const surface02 = getColor(primaryGray, 4, dark, colorful);

  const text01 = getColor(primaryGray, 11, dark, colorful, true);
  const text02 = getColor(primaryGray, 12, dark, colorful, true);
  const text03 = getColor(primary, 11, dark, colorful);
  const text04 = getColor(primary, 12, dark, colorful);
  const text05 = getColor(secondary, 11, dark, colorful);
  const text06 = getColor(secondary, 12, dark, colorful);

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
    'editor.background': surface02,

    // ActivityBar
    'activityBar.foreground': getColor(primary, 11, dark, colorful),
    'activityBar.background': surface01,

    // SideBar
    // 'sideBar.foreground': getRadixColor(primaryGray, 11, dark),
    'sideBar.background': surface01,

    // EditorGroups and Tabs
    'editorGroupHeader.tabsBackground': getColor(primary, 2, dark, colorful),
    'tab.activeForeground': getColor(primaryGray, 12, dark, colorful),
    'tab.activeBackground': getRadixColor(primary, 3, dark),
    'tab.activeBorderTop': getRadixColor(primary, 9, dark),
    'tab.inactiveForeground': getColor(primaryGray, 11, dark, colorful),
    'tab.inactiveBackground': surface01,

    // TitleBar
    'titleBar.activeForeground': getRadixColor(primaryGray, 11, dark),
    'titleBar.activeBackground': surface01,
  };

  o.tokenColors.push(
    ...generateTokenColors({
      comments: text01,

      keywords: text02,

      foreground: text03,
      variables_and_properties: text03,

      classes_and_constants: text04,
      functions_and_methods: text04,

      numbers: text05,
      strings: text05,

      operators_and_special_functions: text06,
    })
  );
}
