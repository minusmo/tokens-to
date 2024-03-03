/**
 * Test Object is flattened to Css Variable Object.
 */
import { CssVariables, CssVariablesMap } from '../src/cssvariables';

describe('Test CssVariables', () => {
  //given css token object
  const palette = {
    neutral: [
      '#808080',
      '#777678',
      '#6d6c6f',
      '#646367',
      '#5b595f',
      '#525057',
      '#49474f',
      '#413e47',
      '#383540',
      '#302d38',
    ],
  };
  test('Test resolving object to css variable object', () => {
    const cssVariables = new CssVariables();
    cssVariables.resolve(palette);
    const cssVariablesMap: CssVariablesMap = cssVariables.getCssVariablesMap();

    expect(cssVariablesMap).toHaveProperty('--neutral-0', '#808080');
    expect(cssVariablesMap).toHaveProperty('--neutral-1', '#777678');
    expect(cssVariablesMap).toHaveProperty('--neutral-2', '#6d6c6f');
    expect(cssVariablesMap).toHaveProperty('--neutral-3', '#646367');
    expect(cssVariablesMap).toHaveProperty('--neutral-4', '#5b595f');
    expect(cssVariablesMap).toHaveProperty('--neutral-5', '#525057');
    expect(cssVariablesMap).toHaveProperty('--neutral-6', '#49474f');
    expect(cssVariablesMap).toHaveProperty('--neutral-7', '#413e47');
    expect(cssVariablesMap).toHaveProperty('--neutral-8', '#383540');
    expect(cssVariablesMap).toHaveProperty('--neutral-9', '#302d38');
  });
  test('Test prefix', () => {
    const cssVariables = new CssVariables();
    cssVariables.setPrefix('my');
    cssVariables.resolve(palette);
    const cssVariablesMap: CssVariablesMap = cssVariables.getCssVariablesMap();

    expect(cssVariablesMap).toHaveProperty('--my-neutral-0', '#808080');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-1', '#777678');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-2', '#6d6c6f');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-3', '#646367');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-4', '#5b595f');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-5', '#525057');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-6', '#49474f');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-7', '#413e47');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-8', '#383540');
    expect(cssVariablesMap).toHaveProperty('--my-neutral-9', '#302d38');
  });
  test('Test resolved css variable object has proper prefix', () => {
    const cssVariables = new CssVariables();
    cssVariables.setPrefix('palette');
    cssVariables.resolve(palette);
    const cssVariablesMap: CssVariablesMap = cssVariables.getCssVariablesMap();

    expect(cssVariablesMap).toHaveProperty('--palette-neutral-0', '#808080');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-1', '#777678');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-2', '#6d6c6f');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-3', '#646367');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-4', '#5b595f');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-5', '#525057');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-6', '#49474f');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-7', '#413e47');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-8', '#383540');
    expect(cssVariablesMap).toHaveProperty('--palette-neutral-9', '#302d38');
  });
  test('Test resolving many object into single css variable object', () => {
    const colors = {
      blackShades: [
        '#808080',
        '#777678',
        '#6d6c6f',
        '#646367',
        '#5b595f',
        '#525057',
        '#49474f',
        '#413e47',
        '#383540',
        '#302d38',
      ],
    };
    const cssVariables = new CssVariables();
    cssVariables.resolveMany([palette, colors]);
    const cssVariablesMap: CssVariablesMap = cssVariables.getCssVariablesMap();

    expect(cssVariablesMap).toHaveProperty('--neutral-0', '#808080');
    expect(cssVariablesMap).toHaveProperty('--neutral-1', '#777678');
    expect(cssVariablesMap).toHaveProperty('--neutral-2', '#6d6c6f');
    expect(cssVariablesMap).toHaveProperty('--neutral-3', '#646367');
    expect(cssVariablesMap).toHaveProperty('--neutral-4', '#5b595f');
    expect(cssVariablesMap).toHaveProperty('--neutral-5', '#525057');
    expect(cssVariablesMap).toHaveProperty('--neutral-6', '#49474f');
    expect(cssVariablesMap).toHaveProperty('--neutral-7', '#413e47');
    expect(cssVariablesMap).toHaveProperty('--neutral-8', '#383540');
    expect(cssVariablesMap).toHaveProperty('--neutral-9', '#302d38');

    expect(cssVariablesMap).toHaveProperty('--blackShades-0', '#808080');
    expect(cssVariablesMap).toHaveProperty('--blackShades-1', '#777678');
    expect(cssVariablesMap).toHaveProperty('--blackShades-2', '#6d6c6f');
    expect(cssVariablesMap).toHaveProperty('--blackShades-3', '#646367');
    expect(cssVariablesMap).toHaveProperty('--blackShades-4', '#5b595f');
    expect(cssVariablesMap).toHaveProperty('--blackShades-5', '#525057');
    expect(cssVariablesMap).toHaveProperty('--blackShades-6', '#49474f');
    expect(cssVariablesMap).toHaveProperty('--blackShades-7', '#413e47');
    expect(cssVariablesMap).toHaveProperty('--blackShades-8', '#383540');
    expect(cssVariablesMap).toHaveProperty('--blackShades-9', '#302d38');
  });
});
