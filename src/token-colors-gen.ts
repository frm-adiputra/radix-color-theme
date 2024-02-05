import {refs} from './token-colors-refs';

type TokenType =
  | 'foreground'
  | 'variables_and_properties'
  | 'keywords'
  | 'numbers'
  | 'classes_and_constants'
  | 'functions_and_methods'
  | 'strings'
  | 'operators_and_special_functions'
  | 'comments';

const category: Record<TokenType, string> = {
  foreground: '#d4d4d4',
  variables_and_properties: '#e06c75',
  keywords: '#c678dd',
  numbers: '#d19a66',
  classes_and_constants: '#e5c07b',
  functions_and_methods: '#61afef',
  strings: '#98c379',
  operators_and_special_functions: '#56b6c2',
  comments: '#7f848e',
};

interface ITokenColors {
  foreground: string;
  variables_and_properties: string;
  keywords: string;
  numbers: string;
  classes_and_constants: string;
  functions_and_methods: string;
  strings: string;
  operators_and_special_functions: string;
  comments: string;
}

export function generateTokenColors(
  tokenColors: ITokenColors
): Array<Record<string, any>> {
  const result: Array<Record<string, any>> = [];
  result.push(...filterAndApply('foreground', tokenColors.foreground));
  result.push(
    ...filterAndApply(
      'variables_and_properties',
      tokenColors.variables_and_properties
    )
  );
  result.push(...filterAndApply('keywords', tokenColors.keywords));
  result.push(...filterAndApply('numbers', tokenColors.numbers));
  result.push(
    ...filterAndApply(
      'classes_and_constants',
      tokenColors.classes_and_constants
    )
  );
  result.push(
    ...filterAndApply(
      'functions_and_methods',
      tokenColors.functions_and_methods
    )
  );
  result.push(...filterAndApply('strings', tokenColors.strings));
  result.push(
    ...filterAndApply(
      'operators_and_special_functions',
      tokenColors.operators_and_special_functions
    )
  );
  result.push(...filterAndApply('comments', tokenColors.comments));
  return result;
}

function filterAndApply(
  tokenType: TokenType,
  color: string
): Array<Record<string, any>> {
  return refs()
    .filter(e => e['settings']['foreground'] === category[tokenType])
    .map(e => {
      e['settings']['foreground'] = color;
      return e;
    });
}
