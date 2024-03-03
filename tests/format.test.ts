import { makeLowerCased, removeQuotationMarks } from '../src/format';
/**
 * Tests for formatting functions.
 */
describe('Test format', () => {
  const stringWithQuotationMarks = '""""""a"""b""""c""';
  test('Test removeQuotationMarks', () => {
    const stringWithoutQuotationMarks = removeQuotationMarks(
      stringWithQuotationMarks
    );
    expect(stringWithoutQuotationMarks).toEqual('abc');
  });
  test('Any case word to lower case', () => {
    const anyCasedWord = 'Hallelujah jesus';
    const lowerCasedWord = 'hallelujahjesus';
    expect(makeLowerCased(anyCasedWord)).toBe(lowerCasedWord);
  });
});
