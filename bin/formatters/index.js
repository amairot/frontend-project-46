import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, style) => {
    switch (style) {
        case 'stylish':
            return makeStylish(data);
        case 'plain':
            return makePlain(data);
        default:
            break;
    }
}