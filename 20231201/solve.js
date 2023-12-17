"use strict";
const fs = require('node:fs');

const TEST = false;
let input = '';

if (TEST) {
    input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;    
} else {
    try {
        input = fs.readFileSync('input', 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
}
const isNumeric = (c) => c >= '0' && c <= '9';

const getFirstDigit = (str) => {
    for (const c of str) {
        if (isNumeric(c)) return c;
    }
}

const getCalibValue = (line) => {
    const firstDigit = getFirstDigit(line);
    const lastDigit = getFirstDigit(line.split``.reverse().join``);
    return [firstDigit,lastDigit].join`` * 1;
};

if (TEST) {
    input.split`\n`.forEach((el) => console.log(el, getCalibValue(el)));
}

console.log(input.split`\n`.reduce((pre, cur) => pre = pre + getCalibValue(cur), 0));