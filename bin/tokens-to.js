#!/usr/bin/env node

import { TokensToCli } from '../build/index.js';

function main() {
  const cli = new TokensToCli();
  cli.runJs2Css().runJs2Json().parseArgs();
}

main();
