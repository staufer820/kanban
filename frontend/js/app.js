'use strict'
async function getCards() {
    const response = await fetch("/cards/all");
    return await response.json();
}

function getDeleteButton(id){
    return `<button onclick="deleteCard(${id})">DELETE</button>`;
}

function getMoveButton(id, column, buttonText){
    return `<button onclick="moveCard(${id}, ${column})">${buttonText}</button>`;
}

async function deleteCard(id){
    await fetch(`/delete/${id}`, {
        method: "DELETE"
    });
    await renderCards();
}

async function moveCard(id, column){
    const card = {
        id: id,
        column: column,
    };
    await fetch(`/move`, {
        method: "POST",
        body: JSON.stringify(card),
        headers: {'Content-Type': 'application/json'}
    });
    await renderCards();
}

async function createCard(){
    const card = {
        column: document.getElementById("description").value,
        text: document.getElementById("col").value,
    };
    await fetch(`/add`, {
        method: "PUT",
        body: JSON.stringify(card),
        headers: {'Content-Type': 'application/json'}
    });
    await renderCards();
}

async function renderCards() {
    const cards = await getCards();
    let todo = "<h1>TODO</h1>";
    let inProgress = "<h1>IN PROGRESS</h1>";
    let done = "<h1>DONE</h1>";
    cards.forEach(card => {
        if(card.column == "1"){
            todo += `<div class="card">${card.text}<br>${getMoveButton(card.id, 2, "--->")} ${getDeleteButton(card.id)}</div>`;
        } else if (card.column == "2"){
            inProgress += `<div class="card">${card.text}<br>${getMoveButton(card.id, 1, "<---")}${getMoveButton(card.id, 3, "--->")}${getDeleteButton(card.id)}</div>`;
        } else {
            done += `<div class="card">${card.text}<br>${getMoveButton(card.id, 2, "<---")}${getDeleteButton(card.id)}</div>`;
        }
    });

    const todoList = document.getElementById("1");
    todoList.innerHTML = todo;
    const inProgressList = document.getElementById("2");
    inProgressList.innerHTML = inProgress;
    const doneList = document.getElementById("3");
    doneList.innerHTML = done;
}
renderCards();