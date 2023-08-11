const style = (data, property) => {
    const preResult = data.reduce((acc, item) => {
        const { key, value, status, previousValue, children } = item;
        let thisProperty = '';
        let thisValue = '';
        let thisPreviousValue = '';
        if (property === '') {
            thisProperty = `${key}`;
        } else {
            thisProperty = `${property}.${key}`;
        }
        if (Array.isArray(value)) {
            thisValue = '[complex value]';
        } else {
            thisValue = typeof value === 'string' ? `'${value}'` : value;
        }
        if (Array.isArray(previousValue)) {
            thisPreviousValue = '[complex value]';
        } else {
            thisPreviousValue = typeof previousValue === 'string' ? `'${previousValue}'` : previousValue;
        }
        if (Array.isArray(children)) {
            acc.push(style(children, thisProperty));
            return acc;
        }
        switch (status) {
            case 'removed':
                acc.push(`Property '${thisProperty}' was removed`);
                return acc;
            case 'added':
                acc.push(`Property '${thisProperty}' was added with value: ${thisValue}`);
                return acc;
            case 'updated':
                acc.push(`Property '${thisProperty}' was updated. From ${thisPreviousValue} to ${thisValue}`);
                return acc;
            default:
                return acc;
        }
    }, [])
    return preResult.join('\n');
};

export default (array) => style(array, '');