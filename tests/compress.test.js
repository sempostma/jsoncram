const { compress, decompress } = require('../index');
const schema = require('./testschema.json');
const json = require('./testjson.json');

test('compresses json to a smaller footprint', () => {
    const result = compress(json, schema);

    console.log(JSON.stringify(result, null, 4));

    const before = JSON.stringify(json).length;
    const after = JSON.stringify(result).length;

    expect(after).toBeLessThan(before);
    console.log('saved', 100 - after / before * 100 + '%');
});

test('compress and decompress string and get the same output', () => {
    const compressed = compress(json, schema);
    const decompressed = decompress(compressed, schema);
    expect(json).toEqual(decompressed);
});

test('compress and decompress number and get the same output', () => {
    const schema = {
        "type": "strimg",
        "title": "The String Schema",
    };
    const json = 'Hello World';
    const compressed = compress(json, schema);
    const decompressed = decompress(compressed, schema);
    expect(json).toEqual(decompressed);
});



