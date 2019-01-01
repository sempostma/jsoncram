

const decompress = (compressed, schema, options = {}) => {
    if (Array.isArray(compressed) === false) return compressed;
    return parseProp(schema, compressed.slice(0));
};

const doDecompression = (schema, compressed) => {
    const { required, properties } = schema;
    const ret = {};
    const keys = Object.keys(properties).sort();
    for(let i = 0; i < keys.length; i++) {
        if (properties.hasOwnProperty(keys[i])) {
            const out = parseProp(properties[keys[i]], compressed); 
            ret[keys[i]] = out;
        }   
    }
    return ret;
};

const parseProp = (prop, val) => {
    if (prop.type === 'array') {
        const vals = val.shift();
        const ret = new Array(vals.length);
        for(let i = 0; i < ret.length; i++) ret[i] = parseProp(prop.items, vals);
        return ret;
    } 
    else if (prop.type === 'object') {
        return doDecompression(prop, val);
    } 
    else {
        return val.shift();
    }
};

module.exports = decompress;

