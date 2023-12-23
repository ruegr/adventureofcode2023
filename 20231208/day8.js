"use strict";

const DEBUG = false;

const input = ((TEST = false) => {
    try {
        const fs = require('node:fs');
        return fs.readFileSync(TEST ? 'test-input2.txt' : 'input.txt', 'utf8');
    } catch (err) {
        console.error(err);
        return;
    }
})();

if (DEBUG) {
    console.log('******* INPUT');
    console.log(input);
};

class NetworkSimulation {
    constructor(input) {
        const [instr, nodes] = input.split`\n\n`;
        this.instructions = instr.split``;
        this.nodes = {};
        nodes.split`\n`.forEach(line => {
            let [curNode, childNodes] = line.split`=`;
            curNode = curNode.trim` `;
            childNodes = childNodes.replace(/[\(\)\s]/g, '').split`,`;
            this.nodes[curNode] = { L: childNodes[0], R: childNodes[1] };
        });
        this.resetSim();
    }

    resetSim() {
        this.moves = 0;
        this.curNode = this.nodes['AAA'];
    }

    doStep() {
        if (this.curNode === this.nodes['ZZZ']) return false;
        const nextDir = this.instructions[this.moves % this.instructions.length];
        this.curNode = this.nodes[this.curNode[nextDir]];
        this.moves++;
        return true;
    }
}

const netsim = new NetworkSimulation(input);

while (netsim.doStep()) {

}

console.log({ moves: netsim.moves });

if (DEBUG) debugger;