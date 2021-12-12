'use strict'
import {Router} from 'https://deno.land/x/oak@v6.3.1/mod.ts';
import Card from './card.js';
const router = new Router();

let cards = [];

function getCards(column) {
    let c = [];

    cards.forEach(card => {
        if (card.column == column) c.push(card);
    });

    return c;
}

function moveCard(card, col) {
    card.move(col);
}

function addCard(column, text) {
    cards.push(new Card(text, column));
}



function getCard(id) {
    let card = null;
    cards.forEach(c => {
        if (c.id == id) card = c;
    })
    return card;
}

function deleteCard(id){
    let cardToDelete = getCard(id);
    const index = cards.indexOf(cardToDelete);
    if (index > -1) {
        cards.splice(index, 1);
    }
}

router.get('/cards/all', (ctx) => {
    ctx.response.body = cards;
});

router.get('/cards/:col', (ctx) => {
    ctx.response.body = getCards(ctx.params.col);
});

router.put('/add', async (ctx) => {
    const newItem = await ctx.request.body({type: "json" }).value;
    addCard(newItem.column, newItem.text);
});

router.post('/move', async (ctx) => {
    const item = await ctx.request.body({type: "json" }).value;
    moveCard(getCard(item.id), item.column);
});

router.delete('/delete/:id', (ctx) => {
    deleteCard(ctx.params.id);
});

export const apiRoutes = router.routes();