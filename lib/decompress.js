const { sort, BINARY_LEN } = require('./common')

/**
 * The decompress function.
 * @param {Object} json - The json object.
 * @param {Object} schema -  The json schema.
 * @param {Object} options - The decompress options.
 * @param {Boolean} options.preventShorteningBooleans - Are booleans prevented from being shortened
*/
const decompress = (compressed, schema, options = {}) => {
    if (Array.isArray(compressed) === false) return compressed;
    return parseProp(schema, compressed.slice(0), options);
};

const doDecompression = (schema, compressed, options) => {
    const { required, properties } = schema;
    const ret = {};
    const keys = Object.keys(properties).sort(sort(properties));
    const arr = compressed
    if (!options.preventShorteningBooleans) unPackBooleans(arr, keys, properties)
    for (let i = 0; i < keys.length; i++) {
        const out = parseProp(properties[keys[i]], arr, options);
        ret[keys[i]] = out;
    }
    return ret;
};

const unPackBooleans = (arr, keys, properties) => {
    const booleansCount = Object.values(properties).filter(x => x.type === 'boolean').length
    const end = Math.ceil(booleansCount / BINARY_LEN)
    const unpacked = []
    for (let i = 0; i < end; i++) {
        const number = arr[i]
        const jLength = Math.min(BINARY_LEN, booleansCount - i * BINARY_LEN)
        for (let j = 0; j < jLength; j++) {
            const jEnum = j * j
            unpacked.push(jEnum & number)
        }
    }
    arr.splice(0, end, ...unpacked)
}

const parseProp = (prop, val, options) => {
    if (prop.type === 'array') {
        const vals = val.shift().slice(0);
        const ret = new Array(vals.length);
        for (let i = 0; i < ret.length; i++) ret[i] = parseProp(prop.items, vals, options);
        return ret;
    }
    else if (prop.type === 'object') {
        return doDecompression(prop, val, options);
    }
    else {
        const item = val.shift()
        if (!options.preventShorteningBooleans && prop.type === 'boolean') return item === 1 ? true : false
        else return item;
    }
};

module.exports = decompress;

