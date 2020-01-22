const { decode } = require('./int-encode.js');

/**
 * The decompress function.
 * @param {Object} json - The json object.
 * @param {Object} schema -  The json schema.
 * @param {Object} options - The decompress options.
 * @param {Boolean} options.preventEncodingNumbers - Are numbers prevented from being converted to shorter utf-8 strings?
 * @param {Boolean} options.preventShorteningBooleans - Are booleans prevented from being shortened
*/
const decompress = (compressed, schema, options = {}) => {
    if (Array.isArray(compressed) === false) return compressed;
    return parseProp(schema, compressed.slice(0), options);
};

const doDecompression = (schema, compressed, options) => {
    const { required, properties } = schema;
    const ret = {};
    const keys = Object.keys(properties).sort();
    for (let i = 0; i < keys.length; i++) {
        if (properties.hasOwnProperty(keys[i])) {
            const out = parseProp(properties[keys[i]], compressed, options);
            ret[keys[i]] = out;
        }
    }
    return ret;
};

const parseProp = (prop, val, options) => {
    if (prop.type === 'array') {
        const vals = val.shift();
        const ret = new Array(vals.length);
        for (let i = 0; i < ret.length; i++) ret[i] = parseProp(prop.items, vals, options);
        return ret;
    }
    else if (prop.type === 'object') {
        return doDecompression(prop, val, options);
    }
    else {
        const item = val.shift()
        if (!options.preventEncodingNumbers && prop.type === 'integer' && typeof item === 'string') {
            return decode(item);
        }
        if (!options.preventShorteningBooleans && prop.type === 'boolean') return item === 1 ? true : false
        else return item;
    }
};

module.exports = decompress;

