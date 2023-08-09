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

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yaml');

test('check json to json', () => {
  expect(gendiff(fileJson1, fileJson2)).toBe(idealResult);
});

test('check yaml to json', () => {
  expect(gendiff(fileYaml1, fileYaml2)).toBe(idealResult);
});
