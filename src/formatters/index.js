import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

export default (data, style) => {
    switch (style) {
        case 'stylish':
            return makeStylish(data);
        case 'plain':
            return makePlain(data);
        case 'json':
            return makeJson(data);
        default:
            break;
    }
}