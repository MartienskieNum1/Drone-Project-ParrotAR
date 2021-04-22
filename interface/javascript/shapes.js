"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelectorAll("#moves li div").forEach(button => button.addEventListener('click', drawShape));
}

function drawShape(e) {
    let shapeName = e.target.tagName === "DIV" ?
                        e.target.getAttribute("data-id") :
                        e.target.parentElement.getAttribute("data-id");

    console.log(shapeName)
    
    switch ( (shapeName).toLowerCase() ) {
        case "square":
            drawSquare()
            break;
    
        case "rectangle":
            drawRectangle()
            break;

        case "triangle":
            drawTriangle();
            break;

        case "star":
            drawStar();
        
        case "pentagon":
            drawPentagon();

        case "hearth":
            drawHearth()
    }

    execute()
}

function drawSquare() {
    for (let index = 0; index < 4; index++) {
        addAction("forward");
        addAction("turn Left");
    }
}

function drawRectangle() {
    for (let index = 0; index < 2; index++) {
        addAction("Forward", 2);
        addAction("Turn Left");
        addAction("Forward");
        addAction("Turn Left");
    }
}

function drawTriangle() {
    for (let index = 0; index < 3; index++) {
        addAction("forward");
        addAction("turn Left", 120);
    }
}

function drawStar() {
    addAction("turn Right", 126)
    for (let index = 0; index < 5; index++) {
        addAction("forward");
        addAction("turn Left", 144)
        addAction("forward");
        addAction("turn Right", 72)
    }
}

function drawPentagon() {
    addAction("Turn Right", 18)
    for (let index = 0; index < 5; index++) {
        addAction("Forward");
        addAction("Turn Left", 72);
    }
}

function drawHearth() {
    addAction("Turn Right", 45)
    addAction("Forward", 1.9)
    
    for (let index = 0; index < 4; index++) {
        addAction("Turn Left", 45)
        addAction("Forward", 0.55);
        
    }
    
    addAction("Turn right", 135)

    for (let index = 0; index < 4; index++) {
        addAction("Turn Left", 45)
        addAction("Forward", 0.55);
        
    }
    
    addAction("Turn Left", 45)
    addAction("Forward", 1.9);


}