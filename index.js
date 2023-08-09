#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from './bin/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => gendiff(filepath1, filepath2));

program.parse();
