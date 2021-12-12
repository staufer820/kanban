'use strict'
class Card {
    static n = 0;
    constructor(column, text) {
        Card.n++;
        this.id = Card.n;
        this.column = column;
        this.text = text;
    }

    move(i) {
        this.column = i;
    }
}

export default Card;