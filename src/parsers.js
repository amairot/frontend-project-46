import yaml from 'js-yaml';

export default (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  } if (extension === ('.yaml' || '.yml')) {
    return yaml.load(data);
  }
  return data;
};
