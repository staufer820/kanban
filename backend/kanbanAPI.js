'use strict'
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import Card from './card.js';

const port = 8000;
const app = new Application();
const router = new Router();

let cards = [new Card(0, "Test"), new Card(2, "Test 2")];

function getCards(column) {
    let c = [];

    cards.forEach(card => {
        if (card.column == column) c.push(card);
    });

    return c;
}

function moveCard(card, i) {
    card.move(i);
}

function addCard(column, text) {
    cards.push(new Card(column, text));
}

function getCard(id) {
    let card = null;
    cards.forEach(c => {
        if (c.id == id) card = c;
    })
    return card;
}

router.get('/cards/all', (ctx) => {
    ctx.response.body = cards;
});

router.get('/cards/:col', (ctx) => {
    ctx.response.body = getCards(ctx.params.col);
});

router.post('/move', (ctx) => {
    moveCard(getCard(ctx.request.body["id"]), ctx.request.body["column"]);
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
    console.log(`Listening on: localhost:${port}`);
});

await app.listen({port});