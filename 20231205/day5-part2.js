"use strict";

const TEST = false;
const DEBUG = false;

const fs = require('node:fs');
let input = '';

const populateInput = (TEST) => {
    if (TEST) {
        input =
            `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
    } else {
        try {
            input = fs.readFileSync('input.txt', 'utf8');
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

const seeds = {};
const maps = {};

populateInput(TEST);


input.split`\n\n`.forEach((el) => {
    const [key, vals] = el.split(/:\s/);
    if (key == "seeds") {
        for (const m of vals.matchAll(/(?<start>\d+) (?<length>\d+)/gm)) {
            const start = m['groups']['start']*1;
            const length = m['groups']['length']*1;
            for(let i=start;i<start+length;i++){
                seeds[i] = {};
            }
        }
        return;
    }

    const mapName = key.split` `[0];
    maps[mapName] = [];

    for (let line of vals.split`\n`) {

        line = line.split` `.map((el) => el * 1);
        maps[mapName].push({ destStart: line[0], destEnd: line[0] + line[2] - 1, srcStart: line[1], srcEnd: line[1] + line[2] - 1 });
    }
});

const getMapping = (srcVal, mapName) => {
    const theMap = maps[mapName].filter((m) => m['srcStart'] <= srcVal && m['srcEnd'] >= srcVal)[0];
    if (theMap === undefined) return srcVal; //no explicit mapping --> mapping==srcVal

    const start = theMap['srcStart'];
    const delta = srcVal - theMap['srcStart'];

    return theMap['destStart'] + delta;
}

Object.keys(seeds).forEach((seed) => {
    seed = seed * 1;
    let category = 'seed';
    let srcVal = seed;
    let mapName = ''
    do {
        mapName = Object.keys(maps).filter((mapName) => mapName.split`-`[0] == category)[0];
        if (mapName === undefined) return;
        const targetCategory = mapName.split`-`[2];

        seeds[seed][targetCategory] = getMapping(srcVal, mapName);

        srcVal = seeds[seed][targetCategory];
        category = targetCategory;
    } while (true)
})



const lowestLocation = Math.min(...Object.values(seeds).map((seed) => seed['location']));
console.log(lowestLocation);