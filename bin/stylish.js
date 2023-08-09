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
            const preValueString = `${spacer.repeat(spacing-2)}${prefix}${key}:`;
            if (Array.isArray(value)) {
                return `${acc}\n${preValueString} ${style(value, spacing + 4)}`;
            } else {
                return `${acc}\n${preValueString} ${value}`;
            }
    }, '');
    const endSpace = (spacing - 4) < 0? (spacing - 2) : (spacing - 4);
    return `{${preResult}\n${spacer.repeat(endSpace)}}`;
};

export default (array) => style(array, 2);