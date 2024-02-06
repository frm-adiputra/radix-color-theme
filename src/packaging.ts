import {cpSync, writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {generate} from './theme';
import type {IOptions} from './theme';

interface IPackagingOpts {
  name: string;
  displayName: string;
  description: string;
  version: string;
  engines: string;
  themesOptions: IOptions[];
  templateDir: string;
  outDir: string;
}

interface IThemePkg {
  label: string;
  uiTheme: 'vs-dark' | 'vs';
  path: string;
}

export function pack(packOpts: IPackagingOpts): void {
  const {templateDir, outDir, themesOptions} = packOpts;
  const themesOutDir = join(outDir, 'themes');
  const packageJSONPath = join(outDir, 'package.json');

  console.log(`==> outDir: ${outDir}`);

  cpSync(templateDir, outDir, {recursive: true});
  writeFileSync(packageJSONPath, createPackageJSON(packOpts), 'utf8');
  rmSync(themesOutDir, {recursive: true, force: true});
  mkdirSync(themesOutDir, {recursive: true});

  for (let i = 0; i < themesOptions.length; i++) {
    const opts = themesOptions[i];
    writeTheme(opts, themesOutDir);
  }
}

function createPackageJSON(packOpts: IPackagingOpts): string {
  const {name, displayName, description, version, engines, themesOptions} =
    packOpts;
  const themes = createThemesDeclarations(themesOptions);
  return JSON.stringify(
    {
      name,
      displayName,
      description,
      version,
      engines: {vscode: engines},
      categories: ['Themes'],
      contributes: {themes},
    },
    null,
    2
  );
}

function createThemesDeclarations(themesOptions: IOptions[]): IThemePkg[] {
  return themesOptions.map(e => {
    const arr = themeFingerprint(e);
    const themePkg: IThemePkg = {
      label: arr.join(' '),
      uiTheme: e.dark ? 'vs-dark' : 'vs',
      path: `./themes/${filename(arr)}`,
    };
    return themePkg;
  });
}

function writeTheme(opts: IOptions, themesDstDir: string) {
  const name = themeName(opts);
  const json = generate(name, opts);
  const filename = themeFilename(opts);

  writeFileSync(join(themesDstDir, filename), json, 'utf8');
  console.log(`--> theme created: ${name}`);
}

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

function themeFilename(opts: IOptions): string {
  return filename(themeFingerprint(opts));
}

function themeName(opts: IOptions): string {
  return themeFingerprint(opts).join('-');
}
