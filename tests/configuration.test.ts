/**
 * Test configuration help functions
 */
import {
  CssGenerationConfig,
  IllegalOptionError,
  getConfiguration,
  isTs,
  parseCssOptions,
  validateOptions,
} from '../src/configuration';
import {
  composeFilePath,
  extractDirName,
  extractFileName,
  getRootProjectPath,
  isNotObject,
  resolveOutPath,
} from '../src/files';

describe('Test functions for configurations', () => {
  test('Test getRootProjectPath', () => {
    expect(getRootProjectPath()).toEqual(process.cwd());
  });
  test('Test composeFilePath', () => {
    const outDir = getRootProjectPath();
    const filename = 'cssvariables';
    const extension = '.css';
    const filePath = composeFilePath(outDir, filename, extension);
    expect(filePath).toEqual(process.cwd() + `/${filename}${extension}`);
  });
  test('Test parseOptions', () => {
    const fakeCliOptions = [] as string[];
    const cliOptions = {
      sources: ['./src/*.js'],
      outDir: './dist',
      outFile: 'cssv',
      bundled: true,
    } as CssGenerationConfig;
    expect(isNotObject(fakeCliOptions)).toEqual(true);
    expect(isNotObject(cliOptions)).toEqual(false);
    expect(() => {
      parseCssOptions(fakeCliOptions);
    }).toThrow(new Error(`Wrong cli options object passed: ${fakeCliOptions}`));
  });
  test('Test validateOptions', () => {
    const wrongOptions = {
      outFileName: 'afile.',
    } as CssGenerationConfig;
    expect(() => {
      validateOptions(wrongOptions);
    }).toThrow(new IllegalOptionError('Command line option errors'));
  });
  test('Test resolveOutPath', () => {
    const outDir = './dist/css';
    const projectPath = '/Users/hojooneum/tokenToCss';
    const sourceFilePathRelative = './tokens/color/black.js';
    const fileName = extractFileName(sourceFilePathRelative, '.js');
    expect(
      resolveOutPath(
        projectPath,
        outDir,
        extractDirName(sourceFilePathRelative),
        fileName + '.css'
      )
    ).toEqual('/Users/hojooneum/tokenToCss/dist/css/tokens/color/black.css');
  });
  test('Test getConfiguration', async () => {
    const configuration = await getConfiguration();
    expect(configuration).toHaveProperty('css');
    expect(configuration.css).toHaveProperty('sources');
    expect(configuration.css).toHaveProperty('outFileName');
    expect(configuration.css).toHaveProperty('outDir');
    expect(configuration.css).toHaveProperty('bundled');
    expect(configuration.css).toHaveProperty('selector');
    expect(configuration.css).toHaveProperty('prefix');

    expect(configuration).toHaveProperty('json');
    expect(configuration.json).toHaveProperty('sources');
    expect(configuration.json).toHaveProperty('outFileName');
    expect(configuration.json).toHaveProperty('outDir');
    expect(configuration.json).toHaveProperty('bundled');
  });
  test('Test isTs', () => {
    expect(isTs('./token.ts')).toBe(true);
    expect(isTs('./token.js')).toBe(false);
  });
});
