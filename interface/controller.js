'use strict';

document.addEventListener('DOMContentLoaded', init);

let actions = [];

function init() {
    document.querySelectorAll("#controls button, #setup > div button").forEach(button => button.addEventListener('click', addAction));
    document.querySelector("#setup > button").addEventListener('click', execute);
}

function addAction(e) {
    e.preventDefault();

    if ( e.target.innerText !== "Take off" || !actions.includes(e.target) ) {
        actions.push(e.target)
        document.querySelector("#sequence").innerHTML += `<li data-id="${actions.length-1}">${e.target.innerText}</li>`
    }

    document.querySelectorAll("#sequence li").forEach(action => action.addEventListener('click', removeAction));
}

function removeAction(e) {
    let index = e.target.getAttribute("data-id");
    actions.splice(index, 1);
    e.target.remove();
}

function execute() {
    document.querySelector("#sequence").innerHTML = ``;
    let text = " | ";
    actions.forEach(action => {
        text += action.innerText + " | ";
        doAction(action.innerText);
    });


    actions = [];
}

function doAction(actionName) {
    switch (actionName) {
        case "Forward":
            break;
        case "Backwards":
            break;
        case "Left":
            break;
        case "Right":
            break;
        case "Turn Left":
            break;
        case "Turn Right":
            break;
        case "Up":
            break;
        case "Down":
            break;
        case "Take off":
            break;
        case "Land":
            break;
    }
}