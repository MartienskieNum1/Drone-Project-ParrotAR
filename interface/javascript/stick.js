"use strict";

let socket;
let keysPara = document.querySelector(".keys");

let flying = false;

let init = () => {
    console.log("page loaded");
    socket = io();
    document.addEventListener('keypress', navigate);
    document.addEventListener('keydown', navigateDown);
    document.addEventListener('keyup', navigateUp);
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

// joystick input
// left joystick
var Joy1 = new JoyStick('joy1Div');

var joy1X = document.getElementById("joy1X");
var joy1Y = document.getElementById("joy1Y");

setInterval(function () { joy1X.value=Joy1.GetX(); }, 50);
setInterval(function () { joy1Y.value=Joy1.GetY(); }, 50);
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

}, 1000);

// right joystick
var Joy2 = new JoyStick('joy2Div');

var joy2X = document.getElementById("joy2X");
var joy2Y = document.getElementById("joy2Y");

setInterval(function () { joy2X.value=Joy2.GetX(); }, 50);
setInterval(function () { joy2Y.value=Joy2.GetY(); }, 50);
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

}, 1000);

let emit = (command, payload) => {
    socket.emit(command, payload);
};