const { encode } = require('./num-encode.js');

/**
 * The compress function.
 * @param {Object} json - The json object.
 * @param {Object} schema -  The json schema.
 * @param {Object} options - The compress options.
 * @param {Boolean} options.encodedNumbers - Are numbers converted to shorter utf-8 strings?
*/
const compress = (json, schema, options = {}) => {
    return parseProp(schema, json, options);
};

const doCompression = (schema, json, options) => {
    const { required, properties } = schema;
    const keys = Object.keys(properties).sort();
    const ret = [];
    for(let i = 0; i < keys.length; i++) {
        if (properties.hasOwnProperty(keys[i])) {
            const out = parseProp(properties[keys[i]], json[keys[i]], options); 
            properties[keys[i]].type === 'object' ? ret.push(...out) : ret.push(out);
        }
    }
    return ret;
};

const parseProp = (prop, val, options) => {
    if (prop.type === 'array') {
        return val.map(x => parseProp(prop.items, x, options));
    } 
    else if (prop.type === 'object') {
        return doCompression(prop, val, options);
    } 
    else {
        if (options.encodedNumbers && prop.type === 'number') return encode(val);
        return val;
    }
};

module.exports = compress;
