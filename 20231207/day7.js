"use strict";

const TEST = true;
const DEBUG = false;

const fs = require('node:fs');
let input = '';

const populateInput = (TEST = false) => {
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

let hands = [];

class Hand {
    constructor(inputLine) {
        const [cards, bid] = inputLine.split` `;
        this.bid = bid * 1;
        this.cards = [];
        cards.split``.forEach((c) => this.cards.push(new Card(c)));
        this.cards.sort((a, b) => b.value - a.value);
        this.rank = [0,0,0,0,0,0]; //rank of: handtype, topcard, 2nd-topcard, [...], lowestcard. Later ranks may be 0 when hand consists of i.e. pairs
        [this.type, this.rank[0]] = this.evaluate();
    }
    evaluate() {
        const sortReverse = (a,b) => b-a;

        const cardChars = this.cards.map((c) => c.char);
        const uniqueCardChars = [...new Set(cardChars)];
        const uniqueCount = uniqueCardChars.map((c) => cardChars.filter((cc)=> cc===c).length).sort(sortReverse).join``;
        const cardRanks = uniqueCardChars.map((c) => Card.cardVals[c][1]);


        const [type, typeRank] = Hand.types[uniqueCount];

        console.log('*********');
        console.log({ cardChars: cardChars.join`` });
        console.log({ uniqueCardChars: uniqueCardChars.join`` });
        console.log({ uniqueCount: uniqueCount });
        console.log({ typeRank:typeRank, type:type});
        console.log({ cardRanks:cardRanks.join`-`});
        console.log('');
        

        return [type, typeRank];
    }
    static types = {
        '5': ['Five of a kind',7],
        '41': ['Four of a kind',6],
        '32': ['Full house', 5],
        '311': ['Three of a kind', 4],
        '221': ['Two pair', 3],
        '2111': ['One pair', 2],
        '11111': ['High card', 1]
    }
}

class Card {
    constructor(cardChar) {
        this.char = cardChar;
        [this.name, this.value] = Card.cardVals[cardChar];
    }
    static cardVals = {
        A: ['Ace', 13],
        K: ['King', 12],
        Q: ['Queen', 11],
        J: ['Jack', 10],
        T: ['Ten', 9],
        9: ['Nine', 8],
        8: ['Eight', 7],
        7: ['Seven', 6],
        6: ['Six', 5],
        5: ['Five', 4],
        4: ['Four', 3],
        3: ['Three', 2],
        2: ['Two', 1]
    }
}

input.split`\n`.forEach((inputLine) => hands.push(new Hand(inputLine)));

console.log('fin');

//hands.forEach((hand, ix) => console.log(ix, hand.type, hand.rank[0], hand.cards.reduce((res, card) => res+card.char, '')));