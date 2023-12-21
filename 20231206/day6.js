"use strict";

const TEST = false;
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

const getRaces = (input) => {
    let [times, distances] = input.replace(/ +/g, ` `).split`\n`

    times = times.split`:`[1].trim` `.split` `
    distances = distances.split`:`[1].trim` `.split` `
    
    return times.map((time,ix) => ({time:time*1, distance:distances[ix]*1}));
};

const races = getRaces(input);

const calculateDistance = (buttonTime, totalTime) => {
    const speed = buttonTime;
    const driveTime = totalTime - buttonTime;
    const distance = speed * driveTime;
    return distance;
}

for(const race of races) {
    //console.log(race);
    const waysToBeatRecord = [];
    for (let buttonTime=1; buttonTime<race.time; buttonTime++) {
        const distance = calculateDistance(buttonTime, race.time);
        if (distance > race.distance) waysToBeatRecord.push(distance);
        //console.log({buttonTime:buttonTime, distance:distance});
    }
    //console.log(waysToBeatRecord);
    race.waysToBeatRecord = waysToBeatRecord.length;
    
}

console.log('product of ways to beat record:', races.reduce((product, race) => product * race.waysToBeatRecord,1))

console.log('fin')