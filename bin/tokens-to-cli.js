#!/usr/bin/env node

function main() {
  const { TokensToCli } = require('../build/index.js');
  const cli = new TokensToCli();
  cli.runJs2Css().runJs2Json().parseArgs();
}

main();
