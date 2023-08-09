/* eslint no-underscore-dangle: 0 */
import { fileURLToPath } from 'url';
import path from 'node:path';
import gendiff from '../bin/gendiff.js';

const idealResultYaml = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const idealResultJson = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileJson1 = getFixturePath('file3.json');
const fileJson2 = getFixturePath('file4.json');
const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yaml');

test('check json to json', () => {
  expect(gendiff(fileJson1, fileJson2)).toBe(idealResultJson);
});

test('check yaml to json', () => {
  expect(gendiff(fileYaml1, fileYaml2)).toBe(idealResultYaml);
});
