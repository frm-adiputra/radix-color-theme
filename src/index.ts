import 'dotenv/config';
import {pack} from './packaging';
import {join} from 'node:path';

pack({
  name: 'radix-color-theme',
  displayName: 'Radix color theme',
  description: 'VSCode color theme based on Radix colors',
  version: '0.0.1',
  engines: '^1.86.0',
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
  templateDir: join('.', 'dist-template'),
  outDir: process.env.RADIX_VSCODE_THEME_OUT_DIR || join('.', 'dist'),
});
