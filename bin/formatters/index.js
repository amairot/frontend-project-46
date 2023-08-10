import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, style) => {
    console.log('hi');
    switch (style) {
        case 'stylish':
            console.log('hi 2');
            return makeStylish(data);
        case 'plain':
            return makePlain(data);
        default:
            break;
    }
}