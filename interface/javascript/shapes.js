"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelectorAll("#moves button").forEach(button => button.addEventListener('click', drawShape));
}

function drawShape(e) {
    e.preventDefault()
    
    createShape(e.target.innerText);

    switch (e.target.innerText) {
        case "Square":
            drawSquare()
            break;
    
        case "Triangle":
            drawTriangle();
            break;

        case "Star":
            drawStar();
        
        case "Standing Rectangle":
            drawStandingRectangle();
    }

    execute()
}

function drawSquare() {
    for (let index = 0; index < 4; index++) {
        addAction("turn Right");
        addAction("forward");
    }
}

function drawTriangle() {
    for (let index = 0; index < 3; index++) {
        addAction("turn Right", 120);
        addAction("forward");
    }
}

function drawStar() {
    for (let index = 0; index < 5; index++) {
        addAction("forward");
        addAction("turn Right", 108)
        addAction("forward");
        addAction("turn Left", 324)
    }
}

function drawStandingRectangle() {
    addAction("Up", 2);
    addAction("Forward");
    addAction("down", 2);
    addAction("backward");
}