"use strict";

const DEBUG = false;

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
    constructor(galaxyMap, spaceExpansion = 2) {
        this.galaxyMap = galaxyMap.split`\n`.map(line => line.split``);
        this.expanded = false;
        this.spaceExpansion = spaceExpansion;
    }

    expandSpace() {
        if (this.expanded) return;

        for (let lineIx = this.galaxyMap.length - 1; lineIx >= 0; lineIx--) {
            if ([...new Set(this.galaxyMap[lineIx])].join`` == `.`) {
                const galaxyMapBeforeSpaceExpansion = this.galaxyMap.slice(0, lineIx);
                const galaxyMapSpaceExtension = [...Array(this.spaceExpansion)].fill(this.galaxyMap[lineIx]);
                const galaxyMapAfterSpaceExpansion = this.galaxyMap.slice(lineIx + 1);
                this.galaxyMap = galaxyMapBeforeSpaceExpansion.concat(galaxyMapSpaceExtension, galaxyMapAfterSpaceExpansion);
            }
        }

        for (let colIx = this.galaxyMap[0].length - 1; colIx >= 0; colIx--) {
            if ([...new Set(this.galaxyMap.map(l => l[colIx]))].join`` == `.`) {
                this.galaxyMap = this.galaxyMap.map(line => line.slice(0, colIx).concat([...Array(this.spaceExpansion).fill('.')],line.slice(colIx+1)));
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
                if (char == `#`) result.push([xPos, yPos]);
            })
        })
        return result;
    }

    calculateShortestDistance(pos1, pos2) {
        const xWidth = Math.max(pos1[0], pos2[0]) - Math.min(pos1[0], pos2[0]);
        const yWidth = Math.max(pos1[1], pos2[1]) - Math.min(pos1[1], pos2[1]);
        return xWidth + yWidth;
    }

    getAllGalaxyDistances() {
        const distances = {};
        const galaxies = this.getGalaxyPositions();
        const gCount = galaxies.length;
        let pathLength = 0;

        for (let i = 0; i < gCount; i++) {
            for (let j = 0; j < gCount; j++) {
                const distName = [i, j].sort().join`-`;
                if ((i != j) && !(distName in distances)) {
                    distances[distName] = this.calculateShortestDistance(galaxies[i], galaxies[j])
                    pathLength += distances[distName];
                    //if (DEBUG) console.log(distName, `:`, distances[distName]);
                };
            }
        }

        console.log({ distCount: Object.keys(distances).length, totalLength: pathLength })

        return distances;
    }
}

const observatory = new Observatory(input, 1000000);

//observatory.drawMap(`initial State`);
observatory.expandSpace();
//observatory.drawMap('expanded');
observatory.getAllGalaxyDistances();

/*for (const [key, value] of Object.entries(observatory.getAllGalaxyDistances())) {
    console.log(`${key}: ${value}`);
}*/

if (DEBUG) debugger;