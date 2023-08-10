#!/usr/bin/env node
import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import findDiff from './finddiff.js';
import parseFile from './parsers.js';
import makePath from './relative-path-into-absolute.js';
import style from './formatters/index.js';

export default (file1, file2, type) => {
  const filepath1 = makePath(file1);
  const filepath2 = makePath(file2);
  const file1RawData = fs.readFileSync(filepath1);
  const file2RawData = fs.readFileSync(filepath2);
  const file1Parsed = parseFile(file1RawData, path.extname(file1));
  const file2Parsed = parseFile(file2RawData, path.extname(file2));
  const result = findDiff(file1Parsed, file2Parsed);
  console.log(type);
  const resultString = style(result, type);
  console.log(resultString);
  return resultString;
};
