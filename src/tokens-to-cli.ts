import {
  CSS_FILE_EXTENSION,
  Configuration,
  CssGenerationConfig,
  IllegalOptionError,
  JSON_FILE_EXTENSION,
  JsonGenerationConfig,
  getConfiguration,
  parseCssOptions,
  parseJsonOptions,
  validateOptions,
} from './configuration.js';
import { CssVariables } from './cssvariables.js';
import {
  resolveFileSources,
  composeFilePath,
  makeDir,
  writeFileAt,
  extractFileName,
  JS_FILE_EXTENSION,
  resolveOutPath,
  getRootProjectPath,
  extractDirName,
  resolveFilePathObjectMap,
} from './files.js';
import { formatCss, formatJson, removeQuotationMarks } from './format.js';
import { Command } from 'commander';
import { Path } from 'glob';
/**
 * Cli for execute command on shell.
 */
export class TokensToCli {
  /**
   * convert js files to css variables.
   * or convert multiple js files to css variables.
   * available options:
   * -d, --dir
   * -od, --outDir default outDir is ./dist/css
   * example usage:
   * with configuration: npm js2css, npm js2css -m token1.js token2.js
   * without configuration: npm js2css
   */
  private _configuration: Required<Configuration> = getConfiguration();
  private readonly _version = require('../package.json').version;
  private _cliProgram: Command;
  constructor() {
    const program = new Command();
    program
      .name('tokens-to')
      .description(
        'cli for converting js, json, ts tokens to css variables, json.'
      )
      .version(this._version);
    this._cliProgram = program;
  }
  /**
   * Run js2css.
   * convert js tokens into css variables.
   */
  public runJs2Css(): TokensToCli {
    const { css } = this._configuration;
    this._cliProgram
      .command('js2css')
      .description('convert js tokens to css variables')
      .usage('tokens.js')
      .usage('--outDir=./dist csstokens.js')
      .usage('--outDir=./dist csstokens.js csstokens.js')
      .usage('--outFile=./dist/tokens.css csstokens.js')
      .usage('--selector=:root csstokens.js')
      .argument('[files...]', 'js files. patterns allowed.')
      .option('-o, --outFileName', 'output filename')
      .option('-d, --outDir', 'output directory')
      .option('-b, --bundled', 'whether output is bundled')
      .option(
        '-s, --selector',
        'what selector will be used for wrapping css variables'
      )
      .hook('preAction', (thisCommand) => {
        try {
          const cliOptions: CssGenerationConfig = parseCssOptions(
            thisCommand.opts()
          );
          validateOptions(cliOptions);
        } catch (err) {
          const illegalOptionError = err as IllegalOptionError;
          this._cliProgram.error(illegalOptionError.message, {
            exitCode: 1,
            code: 'illegaloption-error',
          });
        }
      })
      .action(async (files: string[], options) => {
        try {
          const cliOptions = parseCssOptions(options) as CssGenerationConfig;
          /**
           * Option priority.
           * 1.tokens-to.config.json if exist
           * default value of cli arguement files is [](an empty array).
           * when no argument is given, if (files == []),
           * then should try to use sources in config
           *
           */
          const { sources, outFileName, outDir, bundled, selector, prefix } =
            Object.assign(css, {
              ...cliOptions,
              sources: resolveFileSources(files, css.sources),
            }) as Required<CssGenerationConfig>;
          const cssVariables = new CssVariables();
          cssVariables.setPrefix(prefix);
          const modulePathObjectMap: Map<Path, Object> =
            await resolveFilePathObjectMap(sources);
          if (bundled) {
            cssVariables.resolveMany([...modulePathObjectMap.values()]);
            const outPath = composeFilePath(
              outDir,
              outFileName,
              CSS_FILE_EXTENSION
            );
            const wrappedCssVariablesString =
              CssVariables.wrapCssStringWithSelector(
                selector,
                cssVariables.getCssVariableRawString()
              );
            await makeDir(outDir);
            writeFileAt(
              outPath,
              formatCss(removeQuotationMarks(wrappedCssVariablesString))
            );
          } else {
            for (const [path, object] of modulePathObjectMap.entries()) {
              cssVariables.resolve(object);
              const cssfileName =
                extractFileName(path.name, JS_FILE_EXTENSION) +
                CSS_FILE_EXTENSION;
              const outDirPath = resolveOutPath(
                getRootProjectPath(),
                outDir,
                extractDirName(path.relative())
              );
              const outFilePath = resolveOutPath(
                getRootProjectPath(),
                outDir,
                extractDirName(path.relative()),
                cssfileName
              );
              const wrappedCssVariablesString =
                CssVariables.wrapCssStringWithSelector(
                  selector,
                  cssVariables.getCssVariableRawString()
                );
              await makeDir(outDirPath);
              writeFileAt(
                outFilePath,
                formatCss(removeQuotationMarks(wrappedCssVariablesString))
              );
              cssVariables.reset();
            }
          }
        } catch (err) {
          const error = err as Error;
          this._cliProgram.error(error.message, {
            exitCode: 1,
            code: 'Fatal exception',
          });
        }
      });
    return this;
  }
  public ts2css(): void {
    this._cliProgram
      .command('ts2css')
      .description('convert ts tokens to css variables');
  }
  public runJs2Json(): TokensToCli {
    this._cliProgram
      .command('js2json')
      .description('convert js tokens to json tokens')
      .usage('tokens.js')
      .usage('--outDir=./dist jsontokens.js')
      .usage('--outDir=./dist jsontokens.js jsontokens.js')
      .usage('--outFile=./dist/tokens.json jsontokens.js')
      .argument('[files...]', 'js files. patterns allowed.')
      .option('-o, --outFileName', 'output filename')
      .option('-d, --outDir', 'output directory')
      .option('-b, --bundled', 'whether output is bundled')
      .hook('preAction', (thisCommand) => {
        try {
          const cliOptions: CssGenerationConfig = parseJsonOptions(
            thisCommand.opts()
          );
          validateOptions(cliOptions);
        } catch (err) {
          const illegalOptionError = err as IllegalOptionError;
          this._cliProgram.error(illegalOptionError.message, {
            exitCode: 1,
            code: 'illegaloption-error',
          });
        }
      })
      .action(async (files: string[], options) => {
        const { json } = this._configuration;
        try {
          const cliOptions = parseJsonOptions(options) as JsonGenerationConfig;
          /**
           * Option priority.
           * 1.tokens-to.config.json if exist
           * default value of cli arguement files is [](an empty array).
           * when no argument is given, if (files == []),
           * then should try to use sources in config
           *
           */
          const { sources, outFileName, outDir, bundled } = Object.assign(
            json,
            {
              ...cliOptions,
              sources: resolveFileSources(files, json.sources),
            }
          ) as Required<JsonGenerationConfig>;
          const cssVariables = new CssVariables();
          const modulePathObjectMap: Map<Path, Object> =
            await resolveFilePathObjectMap(sources);
          if (bundled) {
            cssVariables.resolveMany([...modulePathObjectMap.values()]);
            const outPath = composeFilePath(
              outDir,
              outFileName,
              JSON_FILE_EXTENSION
            );
            await makeDir(outDir);
            writeFileAt(
              outPath,
              formatJson(JSON.stringify(cssVariables.getCssVariablesMap()))
            );
          } else {
            for (const [path, object] of modulePathObjectMap.entries()) {
              cssVariables.resolve(object);
              const jsonFileName =
                extractFileName(path.name, JS_FILE_EXTENSION) +
                JSON_FILE_EXTENSION;
              const outDirPath = resolveOutPath(
                getRootProjectPath(),
                outDir,
                extractDirName(path.relative())
              );
              const outFilePath = resolveOutPath(
                getRootProjectPath(),
                outDir,
                extractDirName(path.relative()),
                jsonFileName
              );
              await makeDir(outDirPath);
              writeFileAt(
                outFilePath,
                formatCss(JSON.stringify(cssVariables.getCssVariablesMap()))
              );
              cssVariables.reset();
            }
          }
        } catch (err) {
          const error = err as Error;
          this._cliProgram.error(error.message, {
            exitCode: 1,
            code: 'Fatal exception',
          });
        }
      });
    return this;
  }
  public parseArgs(): void {
    this._cliProgram.parse();
  }
}
