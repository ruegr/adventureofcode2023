"use strict";

const TEST = false;
const DEBUG = false;

const fs = require('node:fs');
let input = '';

const populateInput = (TEST) => {
    if (TEST) {
        input = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;    
    } else {
        try {
            input = fs.readFileSync('input', 'utf8');
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

populateInput(TEST);
input = input.split`\n`;
const lineCount = input.length;
const lineLength = input[0].length;

if(DEBUG) console.log({lineCount:lineCount,lineLength:lineLength});

let partNums = [];

input.forEach((line,ix) => {
    if(DEBUG) console.log(ix, line);
    for (const match of line.matchAll(/\d+/g)) {
        const num = match[0] * 1;
        const numLen = match[0].length;
        const start = match.index;

        const checkColStart = Math.max(0, start - 1);
        const checkColEnd = Math.min(lineLength-1, start + numLen);
        const checkRowStart = Math.max(0, ix-1);
        const checkRowEnd = Math.min(lineCount-1, ix+1)
        //console.log({start:start, num:num, checkColStart:checkColStart, checkColEnd:checkColEnd, checkRowStart:checkRowStart, checkRowEnd:checkRowEnd});

        let isPartNum = false;
        let checkChars = '';

        for (let row=checkRowStart; row<=checkRowEnd; row++) {
            for (let col=checkColStart; col<=checkColEnd; col++) {
                const checkChar = input[row][col];
                checkChars += checkChar;
            }
        }

        if(DEBUG) console.log({num:num, checkChars:checkChars});

        isPartNum = /[^\d.]/g.test(checkChars);


        if (isPartNum) partNums.push(num);
    };
});

if(DEBUG) console.log( partNums );
console.log({result: partNums.reduce((sum, el) => sum+el, 0)});