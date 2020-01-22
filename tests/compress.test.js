const { compress, decompress } = require('../index');
var jsonSchemaGenerator = require('json-schema-generator')

test('compresses json to a smaller footprint', () => {
    const schema = require('./testschema.json');
    const json = require('./testjson.json');
    const result = compress(json, schema);

    const before = JSON.stringify(json).length;
    const after = JSON.stringify(result).length;

    expect(after).toBeLessThan(before);
    console.log('saved', 100 - after / before * 100 + '%');
});

// test('compresses a medium size json payload to a smaller footprint', () => {
//     const json = require('./largejson.json');
//     const schema = jsonSchemaGenerator(json)
//     const result = compress(json, schema);

//     const before = JSON.stringify(json).length;
//     const after = JSON.stringify(result).length;

//     expect(after).toBeLessThan(before);
//     console.log('saved', 100 - after / before * 100 + '%');
// });

// test('compress and decompress string for a medium size json payload and get the same output', () => {
//     const json = require('./largejson.json');
//     const schema = jsonSchemaGenerator(json)
//     const compressed = compress(json, schema);
//     const decompressed = decompress(compressed, schema);
//     expect(json).toEqual(decompressed);
// });

test('compress and decompress string and get the same output', () => {
    const schema = require('./testschema.json');
    const json = require('./testjson.json');
    const compressed = compress(json, schema);
    const decompressed = decompress(compressed, schema);
    expect(json).toEqual(decompressed);
});

test('compress and decompress number and get the same output', () => {
    const schema = {
        "type": "string",
        "title": "The String Schema",
    };
    const json = 'Hello World';
    const compressed = compress(json, schema);
    const decompressed = decompress(compressed, schema);
    expect(json).toEqual(decompressed);
});



