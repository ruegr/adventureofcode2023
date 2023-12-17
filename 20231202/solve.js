"use strict";
const fs = require('node:fs');

const TEST = true;
let input = '';

if (TEST) {
    input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;    
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