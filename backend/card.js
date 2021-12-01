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
        if (this.column <= 0 && i == -1) {
            this.column = 0;
        } else if (this.column >= 2 && i == 1) {
            this.column = 2;
        } else {
            this.column += i;
        }
    }
}

export default Card;