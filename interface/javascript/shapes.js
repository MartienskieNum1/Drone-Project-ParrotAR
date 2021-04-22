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
        
        case "Standing Rectangle":
            drawStandingRectangle();
        
        case "Pentagon":
            drawPentagon();
    }

    execute()
}

function drawSquare() {
    for (let index = 0; index < 4; index++) {
        addAction("forward");
        addAction("turn Left");
    }
}

function drawTriangle() {
    for (let index = 0; index < 3; index++) {
        addAction("forward");
        addAction("turn Left", 120);
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

function drawPentagon() {
    for (let index = 0; index < 5; index++) {
        addAction("Forward");
        addAction("Turn Left", 108);
    }
}

function drawHearth() {
    addAction("Turn Right", 40)
    addAction("Forward", 1.9)
    
    for (let index = 0; index < 4; index++) {
        addAction("Turn Left", 40)
        addAction("Forward", 0.5);
        
    }
    
    addAction("Turn right", 135)

    for (let index = 0; index < 4; index++) {
        addAction("Turn Left", 40)
        addAction("Forward", 0.5);
        
    }
    
    addAction("Turn Left", 40)
    addAction("Forward", 1.9);


}