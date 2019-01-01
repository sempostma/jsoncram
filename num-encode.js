function convertBase(value, fromBase) {
    return value.split('').reverse().reduce(function (carry, digit, index) {
        const digitVal = digit.charCodeAt(0);
        if (digitVal >= fromBase) throw new Error('Invalid digit `' + digit + '` for base ' + fromBase + '.');
        return carry += digitVal * (Math.pow(fromBase, index));
    }, 0);
}

function encode(value, toBase = 65535 /* safe range */) {
    var utf8 = value.toString().split('').map(function(x) { 
    	return String.fromCharCode(x); 
    }).join('');
    var decValue = convertBase(utf8, 10);
    var newValue = '';
    while (decValue > 0) {
        newValue = String.fromCharCode(decValue % toBase) + newValue;
        decValue = (decValue - (decValue % toBase)) / toBase;
    }
    return newValue || '0';
}

function decode(value, fromBase = 65535 /* safe range */) {
    return convertBase(value, fromBase);
}

// tests

function test(value) {
	const encoded = encode(value);
  const decoded = decode(encoded);
  console.log({ value, decoded })
  return value === decoded;
}

console.log('does it work?', test(100000) ? 'yes' : 'no');