const style = (data, property) => {
  const preResult = data.reduce((acc, item) => {
    const {
      key, value, status, previousValue, children,
    } = item;
    const thisItem = [value, previousValue];
    const [thisValue, thisPreviousValue] = thisItem.map((val) => {
      if (Array.isArray(val)) {
        return '[complex value]';
      }
      return typeof val === 'string' ? `'${val}'` : val;
    });
    const thisProperty = property === '' ? `${key}` : `${property}.${key}`;
    if (Array.isArray(children)) {
      return [...acc, style(children, thisProperty)];
    }
    switch (status) {
      case 'removed':
        return [...acc, `Property '${thisProperty}' was removed`];
      case 'added':
        return [...acc, `Property '${thisProperty}' was added with value: ${thisValue}`];
      case 'updated':
        return [...acc, `Property '${thisProperty}' was updated. From ${thisPreviousValue} to ${thisValue}`];
      default:
        return acc;
    }
  }, []);
  return preResult.join('\n');
};

export default (array) => style(array, '');
