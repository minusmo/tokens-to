import { writeFile, mkdir } from 'node:fs/promises';
import { format, normalize } from 'node:path';
import { basename, join, dirname } from 'node:path';
import { Path, glob } from 'glob';
import { errorLog, log } from './format';

export const JS_FILE_EXTENSION = '.js';
export enum ResultCode {
  SUCCESS,
  FAIL,
}
/**
 * Write file at given path.
 * @param path path to write at
 * @param token token string to be written
 * @returns
 */
export async function writeFileAt(
  path: string,
  token: string
): Promise<ResultCode> {
  const extension = path.substring(path.lastIndexOf('.') + 1);
  try {
    await writeFile(path, token);
    const successLog = `${extension} file of tokens created at: `;
    log(successLog, path);
    return ResultCode.SUCCESS;
  } catch (err) {
    const failLog = `${extension} file creation failed with: `;
    errorLog(failLog, err);
    return ResultCode.FAIL;
  }
}
/**
 * Make directory at given path.
 * @param dirPath directory path to be created.
 * @returns
 */
export async function makeDir(dirPath: string): Promise<ResultCode> {
  try {
    await mkdir(dirPath, { recursive: true });
    const successLog = `${dirPath} is created`;
    log(successLog);
    return ResultCode.SUCCESS;
  } catch (err) {
    const failLog = `${dirPath} creation is failed with: `;
    errorLog(failLog, err);
    return ResultCode.FAIL;
  }
}
/**
 * Get root project path where node is running.
 * @returns root project path when node is executed in project dir.
 */
export function getRootProjectPath(): string {
  return process.cwd();
}
/**
 * Compose given file path with fixing paths
 * @param outDir outdirectory
 * @param filename filename
 * @param extension extension for the file
 * @returns composed file path
 */
export function composeFilePath(
  outDir: string,
  filename: string,
  extension: string
): string {
  /**
   * filename doesn't include .css extension name.
   * outDir is expected to be absolute path.
   * outDir is expected to be got from configuration file.
   */
  if (outDir.endsWith('/') === false) {
    outDir = outDir + '/';
  }
  if (filename.startsWith('/')) {
    filename = filename.substring(1);
  }
  if (filename.endsWith('.')) {
    filename = filename.substring(0, filename.length - 1);
  }
  if (extension.startsWith('.') === false) {
    extension = '.' + extension;
  }
  if (extension.endsWith('.')) {
    extension = extension.substring(0, extension.length - 1);
  }
  return normalize(
    format({
      root: '/',
      dir: normalize(outDir),
      name: filename,
      ext: extension,
    })
  );
}
/**
 * Format given path
 * @param configPath
 * @returns formatted and normalized path.
 */
export function formatPath(configPath: string): string {
  if (configPath.startsWith('.')) {
    return getRootProjectPath() + configPath.substring(1);
  }
  return normalize(configPath);
}
/**
 * * Reconstruct file output path.
 * like outDir + current jsfile path
 * fullpath is expected to be replaced with outDir
 * for instance,
 * outdir: ./dist/css
 * fullpath: /Users/hojooneum/tokenToCss/tokens/color/black.js
 * relativePath: ./tokens/color/black.js
 * outPath: ./dist/css/tokens/color/black.css
 * expectedpath: outdir + relativepath + .css
 * @param paths to be joined
 * @returns
 */
export function resolveOutPath(...paths: string[]): string {
  return join(...paths);
}

export function extractFileName(filePath: string, extension: string): string {
  return basename(filePath, extension);
}

export function extractDirName(path: string): string {
  return dirname(path);
}

export async function resolveFilePathObjectMap(
  sources: string[]
): Promise<Map<Path, Object>> {
  const foundSources = await glob(sources, {
    withFileTypes: true,
    nodir: true,
  });
  const modulePathObjectMap: Map<Path, Object> = new Map();
  for await (const foundSource of foundSources) {
    const moduleObject = require(foundSource.fullpath());
    const moduleObjectWithObjectsOnly: Record<string, Object> = {};
    for (const k in moduleObject) {
      if (isObject(moduleObject[k])) {
        moduleObjectWithObjectsOnly[k] = moduleObject[k];
      }
    }
    modulePathObjectMap.set(foundSource, moduleObjectWithObjectsOnly);
  }
  return modulePathObjectMap;
}
/**
 *
 * @param something
 * @returns argument is object or not
 */
export function isObject(something: any): boolean {
  return typeof something === 'object' && Array.isArray(something) === false;
}
/**
 *
 * @param something
 * @returns argument is object or not
 */
export function isNotObject(something: any): boolean {
  if (typeof something !== 'object') return true;
  if (Array.isArray(something)) return true;
  return false;
}
/**
 * Resolve file sources from given file paths
 * @param files given from cli argument
 * @returns file sources
 */
export function resolveFileSources(
  files: string[],
  sourcesFromConfig: string[] | undefined
): string[] {
  let filesources: string[] = [];
  if (files.length === 0) {
    filesources = sourcesFromConfig || [];
  } else {
    filesources = files;
  }
  return filesources;
}
/**
 * Resolve modules js, cjs, mjs
 * import
 * @param modulePath
 */
export async function resolveModule(modulePath: string) {
  return await import(modulePath);
}
