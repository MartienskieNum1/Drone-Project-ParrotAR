"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelectorAll("#moves button").forEach(button => button.addEventListener('click', drawShape));
}

function drawShape(e) {
    e.preventDefault()
    
    switch (e.target.innerText) {
        case "Square":
            drawSquare()
            break;
    
        case "Triangle":
            drawTriangle();
            break;

        case "Star":
            drawStar();
    }
}

function drawSquare() {
    for (let index = 0; index < 4; index++) {
        turnRight(45);
        forward();
    }
}

function drawTriangle() {
    for (let index = 0; index < 3; index++) {
        turnRight(120);
        forward();
    }
}

function drawStar() {
    for (let index = 0; index < 5; index++) {
        forward()
        turnRight(108)
        forward()
        turnLeft(324)
    }
}