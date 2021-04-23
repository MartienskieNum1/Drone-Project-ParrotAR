'use strict';

let socket;
document.addEventListener('DOMContentLoaded', init);

let actions = [];
let parameters = [];

function init() {
    socket = io();

    let abortButton = document.querySelector("#abort") !== null ?
                            document.querySelector("#abort") :
                            document.querySelector("#premade-moves-abort")
    
    abortButton.addEventListener('click', abort)

    document.querySelectorAll("#controls button, #setup > div button").forEach(button => button.addEventListener('click', addToSequence));
    if ((window.location.href).includes("index")) {
        document.querySelector("#setup > button").addEventListener('click', execute);
    }
}

function addToSequence(e) {
    e.preventDefault();

    let sequenceList = document.querySelector("#sequence");

    if ( ActionAvailable(e.target.innerText) ) {
        addAction(e.target.innerText, null)
        
        sequenceList.innerHTML += `<li data-id="${actions.length-1}">${e.target.innerText}</li>`
    }

    document.querySelectorAll("#sequence li").forEach(action => action.addEventListener('click', removeAction));

    sequenceList.scrollTop = sequenceList.scrollHeight;
}

function ActionAvailable(actionName) {
    if (actionName === "TAKE OFF" && actions.length > 0) {
        return actions[actions.length - 1].action === "LAND"
    } else if (actionName === "LAND" && actions.length > 0) {
        return actions[actions.length - 1].action !== "LAND"
    } else {
        return true;
    }

}

function removeAction(e) {
    let index = e.target.getAttribute("data-id");
    actions.splice(index, 1);
    e.target.remove();
}

function execute() {
    if (actions.length > 0) {

        if ( (window.location.href).includes("index") ) {
            document.querySelector("#sequence").innerHTML = ``;
        }
        
        socket.emit('executeSequence', JSON.stringify(actions));

        actions = [];
    }
}

function addAction(actionName, parameter = null) {
    if (actionName === "FLIP") {
        let randomNumber = Math.random();

        actionName = randomNumber > 0.5 ?
                        "Flip ahead" :
                        "Flip behind"
    }

    actions.push({
        action: actionName,
        param: parameter
    })
}

function abort(e) {
    e.preventDefault();

    document.querySelector("#sequence").innerHTML = ``;
    actions = []

    socket.emit("abort", null);
}