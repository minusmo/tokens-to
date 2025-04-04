# 🎨 tokens-to

[🇺🇸 English](./README.md)

デザインシステム間でスタイルトークンを準備するのは手間がかかります。  
`tokens-to` は、JavaScript または TypeScript で定義されたトークンを CSS や JSON に変換し、再利用・配布を簡素化するツールです。

## 📦 主な特徴

- JS/TS で定義されたトークンを CSS 変数または JSON ファイルに変換
- 単一ファイルへのバンドルまたは個別出力を設定可能
- プレフィックス、セレクタ、出力ディレクトリなどの柔軟な構成
- CLI でも `config.json` でも実行可能

## 🚀 インストール

```bash
npm install --save-dev tokens-to
```

## 💡 使用方法

### ✅ JS トークン例:

```ts
export const colors = {
  whites: ['#fffff0', '#fffff1', '#fffff2'],
};
```

### 🔄 変換後 (CSS):

```css
:root {
  --colors-whites-0: #fffff0;
  --colors-whites-1: #fffff1;
  --colors-whites-2: #fffff2;
}
```

### 🔄 複数トークンの例:

```ts
export const curves = {
  card: [10, 20, 30],
};
```

```css
:root {
  --curves-card-0: 10;
  --curves-card-1: 20;
  --curves-card-2: 30;
}
```

## ⚙️ コンフィグ設定 (`tokens-to.config.json`)

```json
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

## 🧪 スクリプト例

```json
"scripts": {
  "tokens-to": "tokens-to",
  "js2css": "tokens-to js2css",
  "js2json": "tokens-to js2json"
}
```

### 実行:

```bash
npm run js2css
npm run js2json
```

### CLI 実行例:

```bash
npm run js2css -- ./tokens/colors.js
npm run js2json --outDir=./dist/json ./tokens/colors.js
```

## 🛠️ 技術スタック

![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6)
![Node.js](https://img.shields.io/badge/Node.js-20.11.24-339933)
![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325)
![ts-jest](https://img.shields.io/badge/ts--jest-29.1.2-blue)
![Commander](https://img.shields.io/badge/Commander-12.0.0-yellow)
![Glob](https://img.shields.io/badge/Glob-10.3.10-orange)

## 🤝 コントリビューション

- **バグ報告**: [Issues](https://github.com/minusmo/tokens-to/issues)
- **新機能提案**: Issue を投稿してください
- **Pull Request 歓迎！**: コーディングスタイルとガイドラインに従ってください

## 📜 ライセンス

MIT License  
詳細は `LICENSE` ファイルをご確認ください。

## 👤 作者

**HoJoon Eum**

GitHub: [minusmo/tokens-to](https://github.com/minusmo/tokens-to)
