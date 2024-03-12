/**
 * Testing function for converting object to json
 */
import { ResultCode, makeDir, writeFileAt } from '../src/files';
import { removeQuotationMarks } from '../src/format';
import { CssVariables } from '../src/cssvariables';

describe('Test files', () => {
  const token = {
    color: {
      saturation: 'high',
      brightness: 500,
      inrgb: 'rgb(10,10,10)',
    },
  };
  const outDir = process.cwd();
  const fileName = 'tokens';
  test('Test object to json writer', async () => {
    const jsonExtension = '.json';
    const targetPath = outDir + '/' + fileName + jsonExtension;
    const formattedJson = JSON.stringify(token);
    /**
     * should be ok when file is written successfully.
     * fail test may be required.
     */
    await expect(writeFileAt(targetPath, formattedJson)).resolves.toBe(
      ResultCode.SUCCESS
    );
  });
  test('Test object to css writer', async () => {
    const cssExtension = '.css';
    const targetPath = outDir + '/' + fileName + cssExtension;
    const cssVariables = new CssVariables();
    cssVariables.resolve(token);
    const wrappedTokens = CssVariables.wrapCssStringWithSelector(
      ':root',
      cssVariables.getCssVariableRawString()
    );
    const formattedCss = removeQuotationMarks(wrappedTokens);
    /**
     * should be ok when file is written successfully.
     * fail test may be required.
     */
    await expect(writeFileAt(targetPath, formattedCss)).resolves.toBe(
      ResultCode.SUCCESS
    );
  });
  test('Test makeDir', async () => {
    const dirPath = './animal/whale';
    await expect(makeDir(dirPath)).resolves.toBe(ResultCode.SUCCESS);
  });
});
