/* eslint no-underscore-dangle: 0 */
import { fileURLToPath } from 'url';
import path from 'node:path';
import gendiff from '../bin/gendiff.js';

const idealResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fullFilepath1 = getFixturePath('file1.json');
const fullFilepath2 = getFixturePath('file2.json');

test('check result', () => {
  expect(gendiff(fullFilepath1, fullFilepath2)).toBe(idealResult);
});
