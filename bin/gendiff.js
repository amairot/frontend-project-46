#!/usr/bin/env node
import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import parseFile from './parsers.js';
import makePath from './relative-path-into-absolute.js';

export default (file1, file2) => {
  const filepath1 = makePath(file1);
  const filepath2 = makePath(file2);
  const file1RawData = fs.readFileSync(filepath1);
  const file2RawData = fs.readFileSync(filepath2);
  const file1Parsed = parseFile(file1RawData, path.extname(file1));
  const file2Parsed = parseFile(file2RawData, path.extname(file2));
  const file1Keys = Object.keys(file1Parsed);
  const file2Keys = Object.keys(file2Parsed);
  const differentKeys = _.difference(file2Keys, file1Keys);
  const allKeys = _.sortBy(file1Keys.concat(differentKeys));
  const result = allKeys.reduce((acc, key) => {
    const value1 = file1Parsed[key];
    const value2 = file2Parsed[key];
    if (value1 === value2) {
      acc.push(`    ${key}: ${value1}`);
      return acc;
    } if (value1 === undefined) {
      acc.push(`  + ${key}: ${value2}`);
      return acc;
    } if (value2 === undefined) {
      acc.push(`  - ${key}: ${value1}`);
      return acc;
    } if (value1 !== value2) {
      acc.push(`  - ${key}: ${value1}`);
      acc.push(`  + ${key}: ${value2}`);
      return acc;
    }
    return acc;
  }, []);
  const resultString = `{\n${result.join('\n')}\n}`;
  console.log(resultString);
  return resultString;
};
