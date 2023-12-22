"use strict";

const TEST = true;
const DEBUG = false;

const fs = require('node:fs');
let input = '';

const populateInput = (TEST=false) => {
    try {
        input = fs.readFileSync(TEST ? 'test-input.txt' : 'input.txt', 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
}

populateInput(TEST);

console.log('******* INPUT')
console.log(input);
