"use strict";

let socket;
let keysPara = document.querySelector(".keys");
let takeoffLandBtn = document.querySelector("#takeoff-land");

var Joy1 = new JoyStick('joy1Div');
var Joy2 = new JoyStick('joy2Div');

let flying = false;

let init = () => {
    console.log("page loaded");
    socket = io();
    document.addEventListener('keypress', navigate);
    document.addEventListener('keydown', navigateDown);
    document.addEventListener('keyup', navigateUp);

    takeoffLandBtn.addEventListener("click", takeoffLand)

    startLeftJoystick();
    startRightJoystick();
};
document.addEventListener('DOMContentLoaded', init);

// keyboard input
let navigate = (e) => {
    keysPara.innerHTML += e.key;

    if (e.key == ' ') {
        if (!flying) {
            emit(baseURL + "/takeoff");
            flying = true;
        } else {
            emit(baseURL + "/land");
            flying = false;
        }
    }
};

let ZPressed = false;

let navigateDown = (e) => {
    if (e.key == 'z' && !ZPressed) {
        emit(baseURL + "/forward");
        ZPressed = true;
    }
};

let navigateUp = (e) => {
    if (e.key == 'z') {
        emit(baseURL + "/stop");
        ZPressed = false;
    }
};

// takeoff-land
let takeoffLand = () => {
    let data = new Object();
    if (takeoffLandBtn.innerHTML == "Takeoff") {
        data.state = "Takeoff"
        data.speed = 0;
        emit("executeStick", JSON.stringify(data));
        takeoffLandBtn.innerHTML = "Land";
    } else {
        data.state = "Land";
        data.speed = 0;
        emit("executeStick", JSON.stringify(data));
        takeoffLandBtn.innerHTML = "Takeoff";
    }
};


// joystick input
// left joystick
let startLeftJoystick = () => {
    setInterval(function () {
        let x = Joy1.GetX();
        let y = Joy1.GetY();
        let data = new Object();
    
        if (x != 0 && y != 0) {
            if (y > 0 && y > Math.abs(x)) {
                data.state = "LeftStickUp";
                data.speed = y / 100;
            } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
                data.state = "LeftStickDown";
                data.speed = y / 100 * -1;
            } else if (x > 0 && x > Math.abs(y)) {
                data.state = "LeftStickRight";
                data.speed = x / 100;
            } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
                data.state = "LeftStickLeft";
                data.speed = x / 100 * -1;
            }
        
            emit("executeStick", JSON.stringify(data));   
        }
    
    }, 100);    
};

// right joystick
let startRightJoystick = () => {
    setInterval(function () {
        let x = Joy2.GetX();
        let y = Joy2.GetY();
        let data = new Object();
    
        if (y > 0 && y > Math.abs(x)) {
            data.state = "RightStickUp";
            data.speed = y / 100;
        } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
            data.state = "RightStickDown";
            data.speed = y / 100 * -1;
        } else if (x > 0 && x > Math.abs(y)) {
            data.state = "RightStickRight";
            data.speed = x / 100;
        } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
            data.state = "RightStickLeft";
            data.speed = x / 100 * -1;
        } else {
            data.state = "StickNeutral";
            data.speed = 0;
        }
    
        emit("executeStick", JSON.stringify(data));
    
    }, 100);    
};

let emit = (command, payload) => {
    socket.emit(command, payload);
};