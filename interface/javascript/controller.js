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
    document.querySelector("#setup > button").addEventListener('click', execute);
}

function addToSequence(e) {
    e.preventDefault();

    let sequenceList = document.querySelector("#sequence");

    if ( e.target.innerText !== "Take off" || !actions.includes(e.target) || actions[actions.length-1].innerText === "Land" ) {
        
        addAction(e.target.innerText, null)
        
        sequenceList.innerHTML += `<li data-id="${actions.length-1}">${e.target.innerText}</li>`
    }

    document.querySelectorAll("#sequence li").forEach(action => action.addEventListener('click', removeAction));

    sequenceList.scrollTop = sequenceList.scrollHeight;
}

function removeAction(e) {
    let index = e.target.getAttribute("data-id");
    actions.splice(index, 1);
    e.target.remove();
}

function execute() {
    if (actions.length > 0) {
        document.querySelector("#abort").style.display = "inherit"

        document.querySelector("#sequence").innerHTML = ``;

        socket.emit('execute', JSON.stringify(actions));

        actions = [];
    }
}

function addAction(actionName, parameter = null) {
    actions.push({
        action: actionName,
        param: parameter
    })
}

function abort(e) {
    e.preventDefault();

    socket.emit("abort", null);
}