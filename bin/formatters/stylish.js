const style = (data, spacing) => {
    const spacer = ' ';
    const preResult = data.reduce((acc, item) => {
            const { key, value, status, previousValue, children } = item;
            const preValueString = `${spacer.repeat(spacing)}`;
            switch (status) {
                case 'updated':
                    if (Array.isArray(value)) {
                        return `${acc}\n${preValueString}- ${key}: ${previousValue}\n${preValueString}+ ${key}: ${style(value, spacing + 4)}`;
                    } else if (Array.isArray(previousValue)) {
                        return `${acc}\n${preValueString}- ${key}: ${style(previousValue, spacing + 4)}\n${preValueString}+ ${key}: ${value}`;
                    } else {
                        return `${acc}\n${preValueString}- ${key}: ${previousValue}\n${preValueString}+ ${key}: ${value}`;
                    }
                case 'added':
                    if (Array.isArray(value)) {
                        return `${acc}\n${preValueString}+ ${key}: ${style(value, spacing + 4)}`;
                    } else {
                        return `${acc}\n${preValueString}+ ${key}: ${value}`;
                    }
                case 'removed':
                    if (Array.isArray(value)) {
                        return `${acc}\n${preValueString}- ${key}: ${style(value, spacing + 4)}`;
                    } else {
                        return `${acc}\n${preValueString}- ${key}: ${value}`;
                    }
                case 'unchanged':
                    if (Array.isArray(children)) {
                        return `${acc}\n${preValueString}  ${key}: ${style(children, spacing + 4)}`;
                    } else {
                        return `${acc}\n${preValueString}  ${key}: ${value}`;
                    }
                default:
                    break;
            }
    }, '');
    return `{${preResult}\n${spacer.repeat((spacing - 2))}}`;
};

export default (array) => style(array, 2);