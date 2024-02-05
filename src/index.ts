import {IOptions, generate} from './gen';
import {writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import {generatePackageDotJSON, themeFilename, themeName} from './theme-pkg';

function generateAndWrite(opts: IOptions, themesDstDir: string) {
  const name = themeName(opts);
  const json = generate(name, opts);
  const filename = themeFilename(opts);
  console.log(json);

  writeFileSync(join(themesDstDir, filename), json, 'utf8');
}

interface IGeneratorOptions {
  dstDir: string;
  themesOptions: IOptions[];
}

function main(genOpts: IGeneratorOptions) {
  const {dstDir, themesOptions} = genOpts;
  const themesDstDir = join(dstDir, 'themes');

  mkdirSync(themesDstDir, {recursive: true});

  for (let i = 0; i < themesOptions.length; i++) {
    const opts = themesOptions[i];
    generateAndWrite(opts, themesDstDir);
  }

  const themePkg = generatePackageDotJSON(themesOptions);
  writeFileSync(join(dstDir, 'package.json'), themePkg, 'utf8');
}

main({
  dstDir: join('..', 'radix-vscode-color-theme'),
  themesOptions: [
    {primary: 'sky', secondary: 'blue', dark: true, colorful: true},
    {primary: 'sky', secondary: 'orange', dark: true, colorful: true},
    {primary: 'blue', secondary: 'purple', dark: true, colorful: true},
    {primary: 'blue', secondary: 'purple', dark: false, colorful: true},
    {primary: 'indigo', secondary: 'blue', dark: true, colorful: true},
    {primary: 'indigo', secondary: 'blue', dark: false, colorful: true},
    {primary: 'grass', secondary: 'lime', dark: true, colorful: true},
    {primary: 'grass', secondary: 'lime', dark: false, colorful: true},
  ],
});
