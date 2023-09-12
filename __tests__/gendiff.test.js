/* eslint no-underscore-dangle: 0 */
import { fileURLToPath } from 'url';
import path from 'node:path';
import gendiff from '../src/gendiff.js';

const idealResultJson = '[{"key":"common","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"removed"},{"key":"setting3","value":null,"status":"updated","previousValue":true},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":[{"key":"key5","value":"value5","status":"unchanged"}],"status":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value":"so much","status":"updated","previousValue":""}],"status":"unchanged"},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}],"status":"unchanged"}],"status":"unchanged"},{"key":"group1","children":[{"key":"baz","value":"bars","status":"updated","previousValue":"bas"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":"str","status":"updated","previousValue":[{"key":"key","value":"value","status":"unchanged"}]}],"status":"unchanged"},{"key":"group2","value":[{"key":"abc","value":12345,"status":"unchanged"},{"key":"deep","children":[{"key":"id","value":45,"status":"unchanged"}],"status":"unchanged"}],"status":"removed"},{"key":"group3","value":[{"key":"deep","children":[{"key":"id","children":[{"key":"number","value":45,"status":"unchanged"}],"status":"unchanged"}],"status":"unchanged"},{"key":"fee","value":100500,"status":"unchanged"}],"status":"added"}]';

const idealResultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const idealResultStylish = `{
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

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yaml');

test('check json to stylish', () => {
  expect(gendiff(fileJson1, fileJson2, 'stylish')).toBe(idealResultStylish);
});

test('check json to plain', () => {
  expect(gendiff(fileJson1, fileJson2, 'plain')).toBe(idealResultPlain);
});

test('check json to json', () => {
  expect(gendiff(fileJson1, fileJson2, 'json')).toBe(idealResultJson);
});

test('check yaml to stylish', () => {
  expect(gendiff(fileYaml1, fileYaml2, 'stylish')).toBe(idealResultStylish);
});

test('check yaml to plain', () => {
  expect(gendiff(fileYaml1, fileYaml2, 'plain')).toBe(idealResultPlain);
});

test('check yaml to json', () => {
  expect(gendiff(fileYaml1, fileYaml2, 'json')).toBe(idealResultJson);
});
