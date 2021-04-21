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
            console.log("forward");
            break;
        case "Backwards":
            console.log("backwards");
            break;
        case "Left":
            console.log("left");
            break;
        case "Right":
            console.log("right");
            break;
        case "Turn Left":
            console.log("turn left");
            break;
        case "Turn Right":
            console.log("turn right");
            break;
        case "Up":
            console.log("up");
            break;
        case "Down":
            console.log("down");
            break;
        case "Take off":
            console.log("take off");
            break;
        case "Land":
            console.log("land");
            break;
    }
}