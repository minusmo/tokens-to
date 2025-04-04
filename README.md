<h2 align="center">tokens-to</h2>

[🇯🇵 Japanese](./README_JP.md)

It is somewhat cumbersome to prepare style tokens across design systems. Design and Style tokens can be defined various ways. However, once defining style tokens in Javascript(or Typescript), it is quite tedius and inefficient to write that again in other format such as css and json to be delivered or reused. **_tokens-to_** addresses that problem to ease the pain.

### **[Notice]**

It was commonjs module before 0.0.5, but I decided to move on to es module. The commonjs version will be archived on branch. As the most of tokens work with UI frameworks/libaries which utilizes es module.

## **Table of Contents**

- [Installation](#installation)
- [Usages](#usages)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

## **Installation**

Install the library using npm or yarn:

```bash
npm install --save-dev tokens-to
```

## **Usage**

### Example

Let's say there is a js token like following.

```javascript
export const colors = {
  whites: [
    '#fffff0',
    '#fffff1'
    '#fffff2'
  ]
}

```

And this is what you get after the conversion.

```css
:root {
  --colors-whites-0: #fffff0;
  --colors-whites-1: #fffff1;
  --colors-whites-2: #fffff2;
}
```

When there are multiple tokens like following,

```javascript
export const colors = {
  whites: [
    '#fffff0',
    '#fffff1'
    '#fffff2'
  ]
}

export const curves = {
  card: [
    10,
    20,
    30,
  ]
}
```

And then this is what you get after the conversion.

```css
:root {
  --colors-whites-0: #fffff0;
  --colors-whites-1: #fffff1;
  --colors-whites-2: #fffff2;
  --curves-card-0: 10;
  --curves-card-1: 20;
  --curves-card-2: 30;
}
```

### To Do Before converting

#### Module Exports

To be converted into css, every source js module should export tokens with esm **_"export"_** as following.
The **"export default"** will be converted into variables with prefix **"default"**.

```javascript
export { colorTokens, typographyTokens };
```

Please keep this form(⬆️) of exporting object to get expected output files.

#### Configurations

---

To configure converting to keep consistency and reusability, you can create **_tokens-to.config.json_**

tokens-to.config.json

```javascript
{
  "css": {
    "sources": ["./tokens/*.js"],
    "outFileName": "cssvariables",
    "outDir": "./dist/css",
    "bundled": true,
    "selector": ":root",
    "prefix": ""
  },
  "json": {
    "sources": ["./tokens/*.js"],
    "outFileName": "cssvariables",
    "outDir": "./dist/json",
    "bundled": true
  }
}
```

#### Configuration types and descriptions

- **sources: string[];** //Sources to be converted. Patterns are allowed.
- **outFileName: string;** //Output file name, in case of converting into single css file(bundled).
- **outDir: string;** //Directory for output files.
- **bundled: boolean;** //Whether output file is bundled into single file or not. If false, each sources file is converted into single css file. and outfile option is ignored.
- **selector: string;** //Css selector that wraps css variables.
- **prefix: string;** //Prefix to be prepended in front of each css variables

If configurations are missing, **_Default configurations_** are used instead of.

#### DefaultConfiguration

```javascript
{
  "css": {
    "sources": [],
    "outFileName": "tokens",
    "outDir": "./dist/css",
    "bundled": true,
    "selector": ":root",
    "prefix": "",
  },
  "json": {
    "sources": [],
    "outFileName": "tokens",
    "outDir": "./dist/json",
    "bundled": true,
  }
}
```

When manual configurations are provided, configurations from tokens-to.config.json is overrided.

#### Available manual configurations(command line interface)

arguments

```plaintext
files: optional argument for source files, patterns allowed. If not specified, sources from configurations are used.
```

options

```plaintext
-o, --outFileName:  output filename.
-d, --outDir:  output directory.
-b, --bundled:  whether output is bundled.
-s, --selector: what css selector is used to define css variables.
```

### Add npm scripts

```json
"tokens-to": "tokens-to",
"js2css": "tokens-to js2css",
"js2json": "tokens-to js2json"
```

### **Usages**

Run with configurations

```bash
npm run tokens-to js2css
npm run js2css
npm run tokens-to js2json
npm run js2json
```

Help

```bash
npm run tokens-to help
npm run tokens-to help js2css
npm run tokens-to help js2json
```

#### Run with command line argument

js2css

```bash
npm run js2css ./tokens/colors.js
npm run js2css --outDir=./dist/css ./tokens/colors.js
npm run js2css --outFileName=tokens ./tokens/colors.js
npm run js2css --bundled=true ./tokens/colors.js
npm run js2css --selector=html ./tokens/colors.js
```

js2json

```bash
npm run js2json ./tokens/*.js
npm run js2json --outDir=./dist/json ./tokens/colors.js
npm run js2json --outFileName=tokens ./tokens/colors.js
npm run js2json --bundled=true ./tokens/colors.js
```

## **Contributing**

We welcome contributions to this library! Here's how you can get involved:

- **Bug reports:** If you find a bug, please report it on the GitHub issue tracker.
- **Feature requests:** If you have a feature request, please submit an issue on the GitHub issue tracker.
- **Pull requests:** We encourage you to submit pull requests for bug fixes and new features. Please make sure to follow the coding style and guidelines outlined in the project's contribution guide (if applicable).

## **License**

This library is licensed under the MIT LICENSE. See the LICENSE file for details.

## **Authors**

- HoJoon Eum
