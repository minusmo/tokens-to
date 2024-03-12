import { composeFilePath, getRootProjectPath, isNotObject, readJson } from './files.js';
import { extname } from 'node:path';

export const JSON_FILE_EXTENSION = '.json';
export const CSS_FILE_EXTENSION = '.css';
export const CONFIGURATION_FILE = 'tokens-to.config';
type OptionKey = 'outFileName' | 'outDir' | 'bundled' | 'selector' | 'prefix';
const OPTION_KEYS: OptionKey[] = [
  'outFileName',
  'outDir',
  'bundled',
  'selector',
  'prefix',
];
export const CSS_GENERATION_CONFIG_DEFAULT: Required<CssGenerationConfig> = {
  sources: [],
  outFileName: 'tokens',
  outDir: './dist/css',
  bundled: true,
  selector: ':root',
  prefix: '',
};
export const JSON_GENERATION_CONFIG_DEFAULT: Required<JsonGenerationConfig> = {
  sources: [],
  outFileName: 'tokens',
  outDir: './dist/json',
  bundled: true,
};
export const CONFIG_DEFAULT: Required<Configuration> = {
  css: CSS_GENERATION_CONFIG_DEFAULT,
  json: JSON_GENERATION_CONFIG_DEFAULT,
};
export type CssGenerationConfig = {
  sources?: string[]; //Array of patterns.
  outFileName?: string; //Output file name, in case of converting into single css file(bundled).
  outDir?: string; //Directory for output files.
  bundled?: boolean; //Whether output file is bundled into single file or not. If false, each sources file is converted into single css file. and outfile option is ignored.
  selector?: string; //Css selector that wraps css variables.
  prefix?: string; //Prefix to be prepended in front of each css variables
};
export type JsonGenerationConfig = Omit<
  CssGenerationConfig,
  'selector' | 'prefix'
>;
export type Configuration = {
  css?: CssGenerationConfig;
  json?: JsonGenerationConfig;
};
export type ConfigError = {
  sources?: Error;
  outFileName?: Error;
  outDir?: Error;
  bundled?: Error;
  selector?: Error;
};
export type JsonConfigError = Omit<ConfigError, 'selector'>;
export type CssConfgError = ConfigError;
/**
 * Parse options from command line
 * @param cliObj passed from command line options input
 * @returns CssGenerationConfig
 */
export function parseCssOptions(cliObj: any): CssGenerationConfig {
  if (isNotObject(cliObj)) {
    throw new IllegalOptionError(`Wrong cli options object passed: ${cliObj}`);
  }
  const options: CssGenerationConfig = {};
  for (const optionKey of OPTION_KEYS) {
    if (cliObj[optionKey]) {
      if (optionKey === 'bundled') {
        options[optionKey] = Boolean(cliObj[optionKey]);
      }
      options[optionKey] = cliObj[optionKey];
    }
  }
  return options;
}
/**
 * Parse options from command line
 * @param cliObj passed from command line options input
 * @returns JsonGenerationConfig
 */
export function parseJsonOptions(cliObj: any): JsonGenerationConfig {
  if (isNotObject(cliObj)) {
    throw new IllegalOptionError(`Wrong cli options object passed: ${cliObj}`);
  }
  const options: CssGenerationConfig = {};
  for (const optionKey of OPTION_KEYS) {
    if (cliObj[optionKey]) {
      if (optionKey === 'bundled') {
        options[optionKey] = Boolean(cliObj[optionKey]);
      }
      options[optionKey] = cliObj[optionKey];
    }
  }
  return options;
}
/**
 * Validate options parsed.
 * @param options CssGenerationConfig validated.
 */
export function validateOptions(options: CssGenerationConfig): void {
  let errors: CssConfgError = {};
  if (options.outFileName && options.outFileName.endsWith('.')) {
    errors['outFileName'] = new Error('File name should not ends with a dot.');
  }
  if (Object.keys(errors).length > 0) {
    for (const [config, error] of Object.entries(errors)) {
      console.error(`${config} error by ${error.message}`);
    }
    throw new IllegalOptionError('Command line option errors');
  }
}
/**
 * Check whether given file is ts file or not
 * @param filePath filepath, absolute or relative
 * @returns Whether given file is ts file or not
 */
export function isTs(filePath: string): boolean {
  return extname(filePath) === '.ts';
}
/**
 * Get configuration from config file.
 * @returns Configuration from config file or default when failed.
 */
export async function getConfiguration(): Promise<Required<Configuration>> {
  try {
    const config = readJson(composeFilePath(
      getRootProjectPath(),
      CONFIGURATION_FILE,
      JSON_FILE_EXTENSION
    )) as Configuration;
    return Object.assign(CONFIG_DEFAULT, config);
  } catch (err) {
    console.error(
      'Configuration load failed. Try to use default configuration',
      err
    );
    return CONFIG_DEFAULT;
  }
}
/**
 * IllegalOptionError thrown when validation is failed.
 */
export class IllegalOptionError extends Error {
  constructor(description: string) {
    super(description);
  }
}
