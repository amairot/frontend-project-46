const style = (data, property) => {
    let lastProperty = property;
    let lastValue = '';
    const preResult = data.reduce((acc, item) => {
        const [ key, value, type ] = item;
        let thisProperty = '';
        let thisValue = '';
        if (property === '') {
            thisProperty = `${key}`;
        } else {
            thisProperty = `${property}.${key}`;
        }
        if (Array.isArray(value)) {
            const complexValueCheck = [0, 1, 2]
            if (complexValueCheck.includes(value[0][2])) {
                acc.push(style(value, thisProperty));
                return acc;
            } else {
                thisValue = '[complex value]';
            }
        } else {
            thisValue = typeof value === 'string' ? `'${value}'` : value;
        }
        if (lastProperty === thisProperty) {
            acc.pop();
            acc.push(`Property '${thisProperty}' was updated. From ${lastValue} to ${thisValue}`);
            return acc;
        }
        lastProperty = thisProperty;
        lastValue = thisValue;
        switch (type) {
            case 1:
                acc.push(`Property '${thisProperty}' was removed`);
                return acc;
            case 2:
                acc.push(`Property '${thisProperty}' was added with value: ${thisValue}`);
                return acc;
            default:
                return acc;
        }
    }, [])
    return preResult.join('\n');
};

export default (array) => style(array, '');