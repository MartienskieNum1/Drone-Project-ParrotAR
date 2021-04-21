'use strict';
let socket;
document.addEventListener('DOMContentLoaded', init);

let actions = [];

function init() {
    socket = io();

    let abortButton = document.querySelector("#abort") !== null ?
                            document.querySelector("#abort") :
                            document.querySelector("#premade-moves-abort")
    
    abortButton.addEventListener('click', abort())

    document.querySelectorAll("#controls button, #setup > div button").forEach(button => button.addEventListener('click', addAction));
    document.querySelector("#setup > button").addEventListener('click', execute);
}

function addAction(e) {
    e.preventDefault();

    let sequenceList = document.querySelector("#sequence");

    if ( e.target.innerText !== "Take off" || !actions.includes(e.target) || actions[actions.length-1].innerText === "Land" ) {
        actions.push(e.target)
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
        
        let toSend = JSON.stringify(actions);

        socket.emit('execute', "Testmessage");

        actions = [];
    }
}
