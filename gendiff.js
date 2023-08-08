#!/usr/bin/env node
import _ from 'lodash';
import * as fs from 'node:fs';
import { Command } from 'commander';
import parseJSON from './bin/parse-json.js'
import makePath from './bin/relative-path-into-absolute.js'
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('')
    .arguments('<filepath1>, <filepath2>')
    .option('-f, --format <type>', 'output format')

program.parse();

const options = program.opts();
const outputFormat = options.format;
const filepath1 = makePath(program.args[0]);
const filepath2 = makePath(program.args[1]);
const file1RawData = fs.readFileSync(filepath1);
const file2RawData = fs.readFileSync(filepath2);
const file1Parsed = parseJSON(file1RawData);
const file2Parsed = parseJSON(file2RawData);
const file1Keys = Object.keys(file1Parsed);
const file2Keys = Object.keys(file2Parsed);
const file1KeysSorted = _.sortBy(file1Keys);
const file2KeysSorted = _.sortBy(file2Keys);
const firstSort = file1KeysSorted.reduce((acc, key) => {
    const value1 = file1Parsed[key];
    const value2 = file2Parsed[key];
    if (!file2KeysSorted.includes(key)) {
        acc.push(`- ${key}: ${value1}`);
        return acc;
    }
    if (value1 === value2) {
        acc.push(`  ${key}: ${value1}`);
        return acc;
    }
    acc.push(`- ${key}: ${value1}`);
    acc.push(`+ ${key}: ${value2}`);
    return acc;
}, []);
const secondSort = file2KeysSorted.reduce((acc, key) => {
    const value2 = file2Parsed[key];
    if (!file1KeysSorted.includes(key)) {
        acc.push(`+ ${key}: ${value2}`);
        return acc;
    }
    return acc;
}, firstSort);

const resultString = `{\n${secondSort.join('\n')}\n}`
console.log(resultString);
