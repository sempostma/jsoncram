const { sort, BINARY_LEN } = require('./common')

/**
 * The compress function.
 * @param {Object} json - The json object.
 * @param {Object} schema -  The json schema.
 * @param {Object} options - The compress options.
 * @param {Boolean} options.preventShorteningBooleans - Prevent booleans from being shortened
*/
const compress = (json, schema, options = {}) => {
    return parseProp(schema, json, options);
};

const doCompression = (schema, json, options) => {
    const { required, properties } = schema;
    const keys = Object.keys(properties).sort(sort(properties));
    const arr = [];
    for (let i = 0; i < keys.length; i++) {
        const out = parseProp(properties[keys[i]], json[keys[i]], options);
        properties[keys[i]].type === 'object' ? arr.push(...out) : arr.push(out);
    }
    if (!options.preventShorteningBooleans) packBooleans(arr, keys, properties)
    return arr;
};

const packBooleans = (arr, keys, properties) => {
    let end;
    for(end = 0; end < arr.length && properties[keys[end]].type === 'boolean'; end++) {}
    const packed = []
    for(let i = 0; i < end; i += BINARY_LEN) {
        const bits = arr.slice(i, Math.min(BINARY_LEN, end - i)).join('')
        const number = parseInt(bits, 2)
        packed.push(number)
    }
    arr.splice(0, end, ...packed)
}

const parseProp = (prop, val, options) => {
    if (prop.type === 'array') {
        return val.map(x => parseProp(prop.items, x, options));
    }
    else if (prop.type === 'object' && 'properties' in prop && !('additionalProperties' in prop)) {
        return doCompression(prop, val, options);
    }
    else {
        if (!options.preventShorteningBooleans && prop.type === 'boolean') return val ? 1 : 0
        return val;
    }
};

module.exports = compress;
