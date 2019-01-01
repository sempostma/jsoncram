
const compress = (json, schema, options = {}) => {
    return parseProp(schema, json);
};


const doCompression = (schema, json) => {
    const { required, properties } = schema;
    const keys = Object.keys(properties).sort();
    const ret = new Array(keys.length)
    for(let i = 0; i < keys.length; i++) {
        if (properties.hasOwnProperty(keys[i])) {
            const out = parseProp(properties[keys[i]], json[keys[i]]); 
            properties[keys[i]].type === 'object' ? ret.push(...out) : ret.push(out);
        }
    }
    return ret;
};

const parseProp = (prop, val) => {
    if (prop.type === 'array') {
        return val.map(x => parseProp(prop.items, x));
    } 
    else if (prop.type === 'object') {
        return doCompression(prop, val);
    } 
    else {
        return val;
    }
};

module.exports = compress;