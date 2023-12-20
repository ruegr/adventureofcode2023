"use strict";
const fs = require('node:fs');

const TEST = false;
const DEBUG = true;
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

const getGamePower = (gameLine) => {
    const reveals = gameLine.split`:`[1];
    const minCount = {red:0, green:0, blue:0};

    for (const reveal of reveals.split`;`) {
        for (const countCol of reveal.split`,`) {
            const [count, col] = countCol.trim` `.split` `;
            minCount[col] = Math.max(minCount[col], count);
        }
    }

    return Object.values(minCount).reduce((power, curval) => power * curval, 1);
};


const result=input.split`\n`.reduce((powSum, gameLine) => powSum + getGamePower(gameLine), 0);

console.log({result:result});
