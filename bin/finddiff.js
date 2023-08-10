import _ from 'lodash';

const parseObject = (obj) => {
    const objEntries = Object.entries(obj);
    return objEntries.map(([key, value]) => _.isPlainObject(value) ? {key, children: parseObject(value), status: 'unchanged'} : {key, value, status: 'unchanged'});
};

const findDiff = (object1, object2) => {
    const object1Keys = Object.keys(object1);
    const object2Keys = Object.keys(object2);
    const differentKeys = _.difference(object2Keys, object1Keys);
    const allKeys = _.sortBy(object1Keys.concat(differentKeys));
    const result = allKeys.reduce((acc, key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        acc.push({ key, children: findDiff(value1, value2), status: 'unchanged' });
        return acc;
      }
      if (_.isPlainObject(value1) && !(value2 === undefined)) {
        acc.push({ key, value: value2, status: 'updated', previousValue: parseObject(value1)});
        return acc;
      }
      if (_.isPlainObject(value1)) {
        acc.push({ key, value: parseObject(value1), status: 'removed'});
        return acc;
      }
      if (_.isPlainObject(value2) && !(value1 === undefined)) {
        acc.push({ key, value: parseObject(value2), status: 'updated', previousValue: value1});
        return acc;
      }
      if (_.isPlainObject(value2)) {
        acc.push({ key, value: parseObject(value2), status: 'added' });
        return acc;
      }
      if (value1 === value2) {
        acc.push({ key, value: value1, status: 'unchanged' });
        return acc;
      } if (value1 === undefined) {
        acc.push({ key, value: value2, status: 'added' });
        return acc;
      } if (value2 === undefined) {
        acc.push({ key, value: value1, status: 'removed' });
        return acc;
      } if (value1 !== value2) {
        acc.push({ key, value: value2, status: 'updated', previousValue: value1 });
        return acc;
      }
      return acc;
    }, []);
    return result;
}

export default findDiff;