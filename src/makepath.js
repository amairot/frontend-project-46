import path from 'node:path';
import process from 'process';

export default (givenPath) => {
  if (givenPath.startsWith('/')) {
    return givenPath;
  }
  const currentDirectory = process.cwd();
  return path.resolve(currentDirectory, givenPath);
};
