
const BINARY_LEN = 30 // arbetrary size, should work for all 32 bits systems.
const BIT32_MAX = Math.pow(2, BINARY_LEN)

const sort = properties => (a, b) => {
    if (properties[a].type === 'boolean' && properties[b].type !== 'boolean') return -1
    if (properties[a].type !== 'boolean' && properties[b].type === 'boolean') return 1
    return a.localeCompare(b)
}

module.exports = {
    sort,
    BINARY_LEN
}


