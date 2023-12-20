"use strict";
const fs = require('node:fs');

const TEST = false;
const DEBUG = false;
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

const isGameValid = (gameLine, redCubes=12, greenCubes=13, blueCubes=14) => {
    const cubes = {red:0, green:0, blue:0};
    let [id, reveals] = gameLine.split`:`;
    let valid = true;
    id = id.split` `[1];

    for (const reveal of reveals.split`;`) {
        cubes['red'] = redCubes;
        cubes['green'] = greenCubes;
        cubes['blue'] = blueCubes;

        for (const countCol of reveal.split`,`) {
            const [count, col] = countCol.trim` `.split` `;
            cubes[col] -= count*1;
        }
        valid = valid && cubes['red']>=0 && cubes['green']>=0 && cubes['blue']>=0;
    }

    //valid = Object.values(cubes).reduce((res, val) => res && (val >= 0), true);
    if(DEBUG) console.log(gameLine);
    if(DEBUG) console.log("Game", id, valid, cubes);

    return {id:id, valid:valid, idIfValid:valid ? id*1 : 0, cubes:cubes, gameLine:gameLine};
};


if (DEBUG*0) {
    input.split`\n`.forEach((gameLine) => console.log(isGameValid(gameLine)));
}

const result=input.split`\n`.reduce((idSum, val) => idSum + isGameValid(val)['idIfValid'], 0);

if(DEBUG) console.log({ids:input.split`\n`.reduce((idSum, val) => idSum + ' ' + isGameValid(val)['idIfValid'], '')})
console.log({result:result});
