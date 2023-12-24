"use strict";

const DEBUG = true;

const input = ((TEST = true) => {
    try {
        const fs = require('node:fs');
        return fs.readFileSync(TEST ? 'test-input.txt' : 'input.txt', 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
})();

if (false && DEBUG) {
    console.log('******* INPUT');
    console.log(input);
    console.log('');
};

class Observatory {
    constructor(galaxyMap) {
        this.galaxyMap = galaxyMap.split`\n`.map(line => line.split``);
        this.expanded = false;
    }

    expandSpace() {
        if (this.expanded) return;

        for (let lineIx = this.galaxyMap.length - 1; lineIx >= 0; lineIx--) {
            if ([...new Set(this.galaxyMap[lineIx])].join`` == `.`) {
                const galaxyMapBeforeSpaceExpansion = this.galaxyMap.slice(0, lineIx + 1);
                const galaxyMapAfterSpaceExpansion = this.galaxyMap.slice(lineIx);
                this.galaxyMap = galaxyMapBeforeSpaceExpansion.concat(galaxyMapAfterSpaceExpansion);
            }
        }

        for (let colIx = this.galaxyMap[0].length - 1; colIx >= 0; colIx--) {
            if ([...new Set(this.galaxyMap.map(l => l[colIx]))].join`` == `.`) {
                //console.log({colIx:colIx});
                this.galaxyMap = this.galaxyMap.map(line => line.slice(0, colIx+1).concat(line.slice(colIx)));
            }
        }

        this.expanded = true;
    }

    drawMap(preString = ``) {
        if (preString != ``) console.log(preString);
        console.log(this.galaxyMap.map(line => line.join``).join`\n`);
        console.log(``);
    }

    getGalaxyPositions() {
        const result = [];
        this.galaxyMap.forEach((line, yPos) => {
            line.forEach((char, xPos) => {
                if (char==`#`) result.push([xPos, yPos]);
            })
        })
        return result;
    }
}

const observatory = new Observatory(input);

observatory.drawMap(`initial State`);
observatory.expandSpace();
observatory.drawMap('expanded');
console.log(observatory.getGalaxyPositions())

if (DEBUG) debugger;