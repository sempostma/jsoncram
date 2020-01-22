const offset = 37
const safeLimit = 65535
const safeRange = safeLimit - offset

const convertBase = (value, fromBase) => {
    return value.split('').reverse().reduce(function (carry, digit, index) {
        const digitVal = digit.charCodeAt(0);
        if (digitVal >= fromBase) throw new Error('Invalid digit `' + digit + '` for base ' + fromBase + '.');
        return carry += digitVal * (Math.pow(fromBase, index));
    }, 0);
};

const encode = (value, toBase = safeRange /* safe range */) => {
    var utf8 = value.toString().split('').map(function (x) {
        return String.fromCharCode(x);
    }).join('');
    var decValue = convertBase(utf8, 10);
    var newValue = '';
    while (decValue > 0) {
        newValue = String.fromCharCode(decValue % toBase) + newValue;
        decValue = (decValue - (decValue % toBase)) / toBase;
    }
    return newValue ? offsetCharacters(newValue, offset) : '0'
};

const offsetCharacters = (value, offset) =>
    value.split('')
        .map(x => String.fromCharCode(x.charCodeAt(0) + offset))
        .join('')


const decode = (value, fromBase = safeRange /* safe range */) => {
    return convertBase(offsetCharacters(value, -offset), fromBase);
};

module.exports = {
    encode: encode,
    decode: decode
};
