import _ from 'lodash';

const isObject = (value) => (typeof value === 'object') && (value !== null) && (!Array.isArray(value));
const parseObject = (obj) => {
    const objEntries = Object.entries(obj);
    return objEntries.map(([key, value]) => isObject(value) ? [key, parseObject(value)] : [key, value]);
};

const findDiff = (object1, object2) => {
    const object1Keys = Object.keys(object1);
    const object2Keys = Object.keys(object2);
    const differentKeys = _.difference(object2Keys, object1Keys);
    const allKeys = _.sortBy(object1Keys.concat(differentKeys));
    const result = allKeys.reduce((acc, key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      if (isObject(value1) && isObject(value2)) {
        acc.push([key, findDiff(value1, value2), 0]);
        return acc;
      }
      if (isObject(value1) && !(value2 === undefined)) {
        acc.push([key, parseObject(value1), 1]);
        acc.push([key, value2, 2]);
        return acc;
      }
      if (isObject(value1)) {
        acc.push([key, parseObject(value1), 1]);
        return acc;
      }
      if (isObject(value2) && !(value1 === undefined)) {
        acc.push([key, value1, 1]);
        acc.push([key, parseObject(value2), 2]);
        return acc;
      }
      if (isObject(value2)) {
        acc.push([key, parseObject(value2), 2]);
        return acc;
      }
      if (value1 === value2) {
        acc.push([key, value1, 0]);
        return acc;
      } if (value1 === undefined) {
        acc.push([key, value2, 2]);
        return acc;
      } if (value2 === undefined) {
        acc.push([key, value1, 1]);
        return acc;
      } if (value1 !== value2) {
        acc.push([key, value1, 1]);
        acc.push([key, value2, 2]);
        return acc;
      }
      return acc;
    }, []);
    return result;
}

export default findDiff;