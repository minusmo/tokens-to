/**
 * Flatten an object to make css variable.
 * For example, an object like following
 * const animal = {
 *  duck: {
 *    sound: 'quack'
 *  }
 * }
 * is converted to,
 * const cssVariables = {
 *  --duck-sound: 'quack';
 * }
 */
export type CssVariablesMap = Record<string, string>;
/**
 * class containing css variables object
 * into css variable object.
 */
export class CssVariables {
  /**
   * Wrap an object with an object with a selector.
   * @param selector css selector to wrap css properties
   * @param css wrapped css
   * @returns wrapped css string
   */
  public static wrapCssStringWithSelector(
    selector: string,
    css: string
  ): string {
    return selector + ' ' + css;
  }
  private readonly _cssVariablePrefix = '--';
  private _cssVariables: CssVariablesMap = {};
  private _cssVariableStrings: string[] = [];
  private _variablePrefix: string = '';
  private _cssVariableNameFragments: string[] = [];
  /**
   * Set custom prefix to css variables.
   * @param prefix prefix for each css variable.
   */
  public setPrefix(prefix: string): void {
    this._variablePrefix = prefix;
  }
  /**
   * Resolve passed source object and store in the class.
   * @param object source object to be converted into css variable object.
   */
  public resolve(object: Object): void {
    for (const [k, v] of Object.entries(object)) {
      this._cssVariableNameFragments.push(String(k));
      if (typeof v === 'object') {
        this.resolve(v);
      } else {
        const cssVariableName = this.createCssVariableName();
        this.insertCssVariable(cssVariableName, v);
        this.appendCssVariableString(cssVariableName, v);
      }
      this._cssVariableNameFragments.pop();
    }
  }
  /**
   * Resolve many objects passed source object and store in the class.
   * @param objects source objects to be converted into single css variable object.
   */
  public resolveMany(objects: Object[]): void {
    objects.forEach((object) => {
      this.resolve(object);
      this.cleanUp();
    });
  }
  /**
   * Create css variabe name for given resolve token property.
   * @returns nothing.
   */
  private createCssVariableName(): string {
    let cssVariableName = this._cssVariableNameFragments.join('-');
    if (this._variablePrefix.length > 0) {
      cssVariableName =
        this._cssVariablePrefix + this._variablePrefix + '-' + cssVariableName;
    } else {
      cssVariableName = this._cssVariablePrefix + cssVariableName;
    }
    return cssVariableName;
  }
  /**
   * Insert css variable property to css variable object.
   * @param value object value to added to css variable object.
   */
  private insertCssVariable(cssVariableName: string, value: any): void {
    this._cssVariables[cssVariableName] = String(value);
  }
  /**
   * Append css variable string to css variable string array.
   * @param cssVariableName
   * @param value
   */
  private appendCssVariableString(cssVariableName: string, value: any): void {
    this._cssVariableStrings.push(`${cssVariableName}: ${String(value)};`);
  }
  /**
   * Get css variable object out.
   * @returns css variable object.
   */
  public getCssVariablesMap(): CssVariablesMap {
    return this._cssVariables;
  }
  /**
   * Get css variable raw string.
   * @returns css variable raw string required to be formatted.
   */
  public getCssVariableRawString(): string {
    return '{' + this._cssVariableStrings.join(' ') + '}';
  }
  /**
   * Reset fields for reusing CssVariables instance.
   */
  public reset(): void {
    for (const p in this._cssVariables) {
      delete this._cssVariables[p];
    }
    this.setPrefix('');
    this._cssVariableNameFragments.length = 0;
    this._cssVariableStrings.length = 0;
  }
  /**
   * Clean up fields for resolve next object.
   */
  private cleanUp(): void {
    this._cssVariableNameFragments.length = 0;
  }
}
