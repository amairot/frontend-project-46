const style = (data, spacing) => {
    const spacer = ' ';
    const preResult = data.reduce((acc, item) => {
            const [ key, value, type ] = item;
            let prefix = '';
            switch (type) {
                case 1:
                    prefix = `- `;
                    break;
                case 2:
                    prefix = `+ `;
                    break;
                default:
                    prefix = spacer.repeat(2);
                    break;
            }
            const preValueString = `${spacer.repeat(spacing)}${prefix}${key}:`;
            if (Array.isArray(value)) {
                return `${acc}\n${preValueString} ${style(value, spacing + 4)}`;
            } else {
                return `${acc}\n${preValueString} ${value}`;
            }
    }, '');
    return `{${preResult}\n${spacer.repeat((spacing - 2))}}`;
};

export default (array) => style(array, 2);