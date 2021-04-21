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

// Create JoyStick object into the DIV 'joy1Div'
var Joy1 = new JoyStick('joy1Div');

var joy1IinputPosX = document.getElementById("joy1PosizioneX");
var joy1InputPosY = document.getElementById("joy1PosizioneY");
var joy1Direzione = document.getElementById("joy1Direzione");
var joy1X = document.getElementById("joy1X");
var joy1Y = document.getElementById("joy1Y");

setInterval(function () { joy1IinputPosX.value=Joy1.GetPosX(); }, 50);
setInterval(function () { joy1InputPosY.value=Joy1.GetPosY(); }, 50);
setInterval(function () { joy1Direzione.value=Joy1.GetDir(); }, 50);
setInterval(function () { joy1X.value=Joy1.GetX(); }, 50);
setInterval(function () { joy1Y.value=Joy1.GetY(); }, 50);
setInterval(function () {
    let x = Joy1.GetX();
    let y = Joy1.GetY();
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
    } else if (x < 0 && Math.abs(x) < Math.abs(y)) {
        data.state = "RightStickLeft";
        data.speed = x / 100 * -1;
    } else {
        data.state = "StickNeutral";
        data.speed = 0;
    }

    emit("executeStick", JSON.stringify(data));

}, 50);

let emit = (command, payload) => {
    socket.emit(command, payload);
};