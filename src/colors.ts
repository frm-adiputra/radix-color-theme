import * as colors from '@radix-ui/colors';

const availableColors = [
  ...new Set(
    Object.keys(colors).map(e =>
      e.replace(/(Dark|A|DarkA|P3|DarkP3|P3A|DarkP3A)$/, '')
    )
  ),
] as const;

type AvailableColors = (typeof availableColors)[number];
export type BaseColor = (typeof availableColors)[number];

const colorSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const naturalGrays: Record<string, string> = {
  // Mauve
  tomato: 'mauve',
  red: 'mauve',
  ruby: 'mauve',
  crimson: 'mauve',
  pink: 'mauve',
  plum: 'mauve',
  purple: 'mauve',
  violet: 'mauve',

  // Slate
  iris: 'slate',
  indigo: 'slate',
  blue: 'slate',
  sky: 'slate',
  cyan: 'slate',

  // Sage
  mint: 'sage',
  teal: 'sage',
  jade: 'sage',
  green: 'sage',

  // Olive
  grass: 'olive',
  lime: 'olive',

  // Sand
  yellow: 'sand',
  amber: 'sand',
  orange: 'sand',
  brown: 'sand',
};

const whiteText = [
  'bronze',
  'gold',
  'brown',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
];

export function getRadixColor(
  color: AvailableColors,
  colorStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  dark: boolean,
  alpha: boolean = false
): string {
  const _color = dark ? `${color}Dark` : color;
  const _colorA = alpha ? `${_color}A` : _color;
  return (colors as Record<string, any>)[_colorA][
    `${color}${alpha ? 'A' : ''}${colorStep}`
  ];
}

export function getNaturalGray(color: AvailableColors): string {
  return naturalGrays[color];
}

export function getSolidTextColor(
  color: AvailableColors,
  colorStep: 11 | 12,
  colorful: boolean,
  alpha: boolean = false
): string {
  const solidColor = colorful ? color : getNaturalGray(color);
  if (whiteText.includes(color)) {
    return getRadixColor(solidColor, colorStep, true, alpha);
  }

  return getRadixColor(solidColor, colorStep, false, alpha);
}

export function getColor(
  color: AvailableColors,
  colorStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  dark: boolean,
  colorful: boolean,
  alpha: boolean = false
) {
  const _color = colorful ? color : getNaturalGray(color);
  return getRadixColor(_color, colorStep, dark, alpha);
}
