/**
 * format function for formatting outputs
 */
import {
  css_beautify,
  js_beautify,
  CSSBeautifyOptions,
  JSBeautifyOptions,
} from 'js-beautify';
import { Patterns } from './patterns';

export const log = console.log;
export const errorLog = console.error;

const CSS_DEFAULT_OPTIONS: CSSBeautifyOptions = {
  indent_size: 4,
  indent_char: ' ',
  indent_with_tabs: false,
  eol: '\n',
  end_with_newline: true,
  indent_level: 0,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  wrap_line_length: 0,
  indent_empty_lines: false,
  templating: ['auto'],
};

const JS_DEFAULT_OPTIONS: JSBeautifyOptions = {
  indent_size: 4,
  indent_char: ' ',
  indent_with_tabs: false,
  eol: '\n',
  end_with_newline: true,
  indent_level: 0,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  space_in_paren: false,
  space_in_empty_paren: false,
  jslint_happy: false,
  space_after_anon_function: false,
  space_after_named_function: false,
  brace_style: 'collapse',
  unindent_chained_methods: false,
  break_chained_methods: false,
  keep_array_indentation: false,
  unescape_strings: false,
  wrap_line_length: 0,
  e4x: false,
  comma_first: false,
  operator_position: 'before-newline',
  indent_empty_lines: false,
  templating: ['auto'],
};
/**
 *
 * @param cssRawString a raw string of css
 * @param options options for formatting
 * @returns formatted css string
 */
export function formatCss(
  cssRawString: string,
  options: CSSBeautifyOptions | undefined = CSS_DEFAULT_OPTIONS
): string {
  return css_beautify(cssRawString, options);
}
/**
 *
 * @param jsRawString a raw string of js, json
 * @param options options for formatting
 * @returns formatted js, json string
 */
export function formatJson(
  jsRawString: string,
  options: JSBeautifyOptions | undefined = JS_DEFAULT_OPTIONS
): string {
  return js_beautify(jsRawString, options);
}
/**
 *
 * @param cssVariables css variables to be serialized
 * @returns css variables serialized to string
 */
export function stringify(obj: Object): string {
  return JSON.stringify(obj);
}
/**
 * Remove quotation marks from a string
 * @param rawString string with ""
 * @returns string without ""
 */
export function removeQuotationMarks(rawString: string) {
  return rawString.replace(Patterns.quotationMarks, '');
}
/**
 *
 * @param anyCasedWord any word to be converted to lowerCased word
 * @returns lowerCased word
 */
export function makeLowerCased(anyCasedWord: string): string {
  if (typeof anyCasedWord !== 'string') {
    throw new Error('Type mismatched. Should have string type argument.');
  }
  return anyCasedWord.trim().replace(Patterns.whiteSpaces, '').toLowerCase();
}
