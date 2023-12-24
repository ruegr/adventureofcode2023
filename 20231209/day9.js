"use strict";

const DEBUG = false;

const input = ((TEST = false) => {
    try {
        const fs = require('node:fs');
        return fs.readFileSync(TEST ? 'test-input.txt' : 'input.txt', 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
})();

if (DEBUG) {
    console.log('******* INPUT');
    console.log(input);
    console.log('');
};

class Interpolator {
    constructor(vals) {
        this.lines = [];
        this.lines.push(vals);
    }
    interpolate() {
        let newLineIx = 1;
        //this.printMe('****orig');
        do {
            this.lines[newLineIx] = this.lines[newLineIx - 1].slice(1).map((el, ix) => el - this.lines[newLineIx - 1][ix]);
            newLineIx++;
        } while(this.lines[newLineIx-1].reduce((isZero, val) => isZero && (val==0),true)==false);

        //this.printMe('**** add lines until 0');
        this.lines[this.lines.length-1].push(0);

        for(let lineNo=this.lines.length-2;lineNo>=0;lineNo--) {
            const thisLastElement = this.lines[lineNo].slice(-1)*1;
            const nextLineLastElement = this.lines[lineNo+1].slice(-1)*1;
            this.lines[lineNo].push(thisLastElement + nextLineLastElement);
        }

        this.printMe('**** new last vals calculated');
        
    }
    printMe(preText = ``) {
        if(!DEBUG) return;
        if(preText!=``) console.log(preText);
        this.lines.forEach(line => console.log(line.join` `));
    }
}

const interpolations = [];

input.split`\n`.forEach(line => interpolations.push(new Interpolator(line.split` `.map(val => val * 1))));

interpolations.forEach(i => i.interpolate());

const result = interpolations.map(i => i.lines[0].slice(-1)[0]).reduce((sum, val) => sum+val, 0);

console.log({result:result});

if (DEBUG) debugger;