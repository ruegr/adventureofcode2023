"use strict";

const TEST = false;
const DEBUG = false;

const fs = require('node:fs');
let input = '';

const populateInput = (TEST) => {
    if (TEST) {
        input = 
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;    
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

let totalPoints = 0;

for (const card of input.split`\n`) {
    const cardId = card.split`:`[0].split` `[1];
    const winningNumbers = card.split`:`[1].split`|`[0].trim` `.replace(/\s\s/g, ` `).split` `;
    const myNumbers = card.split`:`[1].split`|`[1].trim` `.replace(/\s\s/g, ` `).split` `;
    
    if(DEBUG) {
        console.log ('*************');
        console.log ({cardId:cardId});
        console.log ('winNum', winningNumbers);
        console.log ('myNums', myNumbers);
    }

    let winningNumberCount = 0;
    let newPoints = 0;
    for(const myNum of myNumbers) {
        if (winningNumbers.includes(myNum)) winningNumberCount++;
    }
    newPoints = (winningNumberCount>0) * 2**(winningNumberCount-1);
    totalPoints += newPoints;
    if(DEBUG) console.log({winningNumberCount:winningNumberCount,newPoints:newPoints});
}

console.log({totalPoints:totalPoints});