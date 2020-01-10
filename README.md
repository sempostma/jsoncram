<div align="center">
  <a href="https://www.json.org">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://worldvectorlogo.com/logos/json.svg">
  </a>
</div>

# jsoncram

Crams json into a smaller footprint and unpacks it.

[![GitHub license](https://img.shields.io/github/license/sempostma/jsoncram.svg)](https://github.com/LesterGallagher/jsoncram/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/sempostma/jsoncram.svg)](https://github.com/LesterGallagher/jsoncram/issues)
[![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/jsoncram.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjsoncram)

## Install

```bash
npm i -D jsoncram
```

## Usage

```javascript
const { compress, decompress } = require('jsoncram');

const json = {
    name: 'Sem Postma',
    age: 21
};

const schema = {
    type: "object",
    required: [
        "name",
        "age"
    ],
    properties: {
        name: {
            type: "string"
        },
        age: {
            type: "number"
        }
    }
};

const compressed = compress(json, schema);
const decompressed = decompress(compressed, schema);

if (
    json.name === decompressed.name
    && json.age === decompressed.age
) {
    console.log('Yeeeeey');
}

```
