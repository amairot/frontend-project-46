
import gendiff from '../bin/gendiff.js';

const idealResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const filepath1 = '../__fixtures__/file1.json';
const filepath2 = '../__fixtures__/file2.json';

const fullFilepath1 = '/mnt/f/prj/frontend-project-46/src/file1.json';
const fullFilepath2 = '/mnt/f/prj/frontend-project-46/src/file2.json';

  test('check result', () => {
    expect(gendiff(fullFilepath1, fullFilepath2)).toBe(idealResult);
  });