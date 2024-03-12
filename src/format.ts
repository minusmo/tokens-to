/**
 * format function for formatting outputs
 */
import { Patterns } from './patterns.js';
/**
 * Remove quotation marks from a string
 * @param rawString string with ""
 * @returns string without ""
 */
export function removeQuotationMarks(rawString: string) {
  return rawString.replace(Patterns.quotationMarks, '');
}
/**
 * Make some word into lower cased word.
 * @param anyCasedWord any word to be converted to lowerCased word
 * @returns lowerCased word
 */
export function makeLowerCased(anyCasedWord: string): string {
  if (typeof anyCasedWord !== 'string') {
    throw new Error('Type mismatched. Should have string type argument.');
  }
  return anyCasedWord.trim().replace(Patterns.whiteSpaces, '').toLowerCase();
}
