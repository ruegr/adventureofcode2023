"use strict";
const fs = require('node:fs');

const TEST = true;
let input = '';

if (TEST) {
    input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;    
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
    const numericWords = {one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9};

    for (const [numWord, num] of Object.entries(numericWords)) {
        line = line.replaceAll(numWord,num);
        // ToDo: This replacement is not the correct solution. ie: twone will become tw1
    }
    
    const firstDigit = getFirstDigit(line);
    const lastDigit = getFirstDigit(line.split``.reverse().join``);
    return [firstDigit,lastDigit].join`` * 1;
};

if (TEST) {
    input.split`\n`.forEach((el) => console.log(el, getCalibValue(el)));
}

console.log(input.split`\n`.reduce((pre, cur) => pre = pre + getCalibValue(cur), 0));