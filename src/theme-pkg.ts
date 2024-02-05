import type {IOptions} from './gen';

interface IThemePkg {
  label: string;
  uiTheme: 'vs-dark' | 'vs';
  path: string;
}

const template = (themes: IThemePkg[]) => ({
  name: 'radix',
  displayName: 'radix',
  description: 'Radix color theme',
  version: '0.0.1',
  engines: {
    vscode: '^1.86.0',
  },
  categories: ['Themes'],
  contributes: {
    themes,
  },
});

function themeFingerprint(opts: IOptions): string[] {
  const arr: string[] = ['radix'];
  if (opts.colorful) arr.push('colorful');
  if (opts.dark) arr.push('dark');
  arr.push(opts.primary);
  arr.push(opts.secondary);
  return arr;
}

function filename(arr: string[]): string {
  return `${arr.join('-')}-color-theme.json`;
}

export function themeFilename(opts: IOptions): string {
  return filename(themeFingerprint(opts));
}

export function themeName(opts: IOptions): string {
  return themeFingerprint(opts).join('-');
}

export function generatePackageDotJSON(themesOptions: IOptions[]): string {
  const themes = themesOptions.map(e => {
    const arr = themeFingerprint(e);
    const themePkg: IThemePkg = {
      label: arr.join(' '),
      uiTheme: e.dark ? 'vs-dark' : 'vs',
      path: `./themes/${filename(arr)}`,
    };
    return themePkg;
  });
  const tmpl = template(themes);
  return JSON.stringify(tmpl, null, 2);
}
