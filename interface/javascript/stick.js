"use strict";

let socket;
let takeoffLandBtn = document.querySelector("#takeoff-land");
let gyroChbx = document.querySelector("#gyroscope");
let keyboardChbx = document.querySelector("#keyboard");

var Joy1 = new JoyStick('joy1Div');
var Joy2 = new JoyStick('joy2Div');

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
let flying = false;
let keyboardData = new Object();
let keyboardSpeed = 1;

let navigate = (e) => {
    if (keyboardChbx.checked) {
        if (e.key == ' ') {
            if (!flying) {
                keyboardData.state = "Takeoff";
                keyboardData.speed = 0;
                emit("executeStick", JSON.stringify(keyboardData));
                flying = true;
            } else {
                keyboardData.state = "Land";
                keyboardData.speed = 0;
                emit("executeStick", JSON.stringify(keyboardData));
                flying = false;
            }
        }
    }
};

let ZPressed = false;
let SPressed = false;
let QPressed = false;
let DPressed = false;
let OPressed = false;
let LPressed = false;
let KPressed = false;
let MPressed = false;

let navigateDown = (e) => {
    keyboardData.speed = keyboardSpeed;
    if (keyboardChbx.checked) {
        if (e.key == 'z' && !ZPressed) {
            keyboardData.state = "LeftStickUp";
            emit("executeStick", JSON.stringify(keyboardData));
            ZPressed = true;
        } else if (e.key == 's' && !SPressed) {
            keyboardData.state = "LeftStickDown";
            emit("executeStick", JSON.stringify(keyboardData));
            SPressed = true;
        } else if (e.key == 'q' && !QPressed) {
            keyboardData.state = "LeftStickLeft";
            emit("executeStick", JSON.stringify(keyboardData));
            QPressed = true;
        } else if (e.key == 'd' && !DPressed) {
            keyboardData.state = "LeftStickRight";
            emit("executeStick", JSON.stringify(keyboardData));
            DPressed = true;
        } else if (e.key == 'o' && !OPressed) {
            keyboardData.state = "RightStickUp";
            emit("executeStick", JSON.stringify(keyboardData));
            OPressed = true;
        } else if (e.key == 'l' && !LPressed) {
            keyboardData.state = "RightStickDown";
            emit("executeStick", JSON.stringify(keyboardData));
            LPressed = true;
        } else if (e.key == 'k' && !KPressed) {
            keyboardData.state = "RightStickLeft";
            emit("executeStick", JSON.stringify(keyboardData));
            KPressed = true;
        } else if (e.key == 'm' && !MPressed) {
            keyboardData.state = "RightStickRight";
            emit("executeStick", JSON.stringify(keyboardData));
            MPressed = true;
        }
    }
};

let navigateUp = (e) => {
    keyboardData.speed = 0;
    keyboardData.state = "StickNeutral";
    if (keyboardChbx.checked) {
        if (e.key == 'z' || e.key == 's' || e.key == 'q' || e.key == 'd' || e.key == 'o' || e.key == 'l' || e.key == 'k' || e.key == 'm') {
            switch (e.key) {
                case 'z':
                    ZPressed = false;
                    break;
                case 's':
                    SPressed = false;
                    break;
                case 'q':
                    QPressed = false;
                    break;
                case 'd':
                    DPressed = false;
                    break;
                case 'o':
                    OPressed = false;
                    break;
                case 'l':
                    LPressed = false;
                    break;
                case 'k':
                    KPressed = false;
                    break;
                case 'm':
                    MPressed = false;
                    break;
            }
            emit("executeStick", JSON.stringify(keyboardData));
        }
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
    let sentNeutral = false;
    setInterval(function () {
        let x = Joy1.GetX();
        let y = Joy1.GetY();
        let data = new Object();
    
        if (x != 0 || y != 0) {
            if (y > 0 && y >= Math.abs(x)) {
                data.state = "LeftStickUp";
                data.speed = y / 100;
            } else if (y < 0 && Math.abs(y) >= Math.abs(x)) {
                data.state = "LeftStickDown";
                data.speed = y / 100 * -1;
            } else if (x > 0 && x >= Math.abs(y)) {
                data.state = "LeftStickRight";
                data.speed = x / 100;
            } else if (x < 0 && Math.abs(x) >= Math.abs(y)) {
                data.state = "LeftStickLeft";
                data.speed = x / 100 * -1;
            }

            if (data.speed > 1) {
                data.speed = 1
            }
        
            emit("executeStick", JSON.stringify(data));
            sentNeutral = false;

        } else {
            if (!sentNeutral) {
                data.state = "StickNeutral";
                data.speed = 0;
                emit("executeStick", JSON.stringify(data));
                sentNeutral = true;
            }
        }
    }, 100);    
};

// right joystick
let startRightJoystick = () => {
    let sentNeutral = false;
    setInterval(function () {
        let x = Joy2.GetX();
        let y = Joy2.GetY();
        let data = new Object();
    
        if (x != 0 || y != 0) {
            if (y > 0 && y >= Math.abs(x)) {
                data.state = "RightStickUp";
                data.speed = y / 100;
            } else if (y < 0 && Math.abs(y) >= Math.abs(x)) {
                data.state = "RightStickDown";
                data.speed = y / 100 * -1;
            } else if (x > 0 && x >= Math.abs(y)) {
                data.state = "RightStickRight";
                data.speed = x / 100;
            } else if (x < 0 && Math.abs(x) >= Math.abs(y)) {
                data.state = "RightStickLeft";
                data.speed = x / 100 * -1;
            }

            if (data.speed > 1) {
                data.speed = 1
            }
        
            emit("executeStick", JSON.stringify(data));
            sentNeutral = false;

        } else {
            if (!sentNeutral) {
                data.state = "StickNeutral";
                data.speed = 0;
                emit("executeStick", JSON.stringify(data));
                sentNeutral = true;
            }
        }
    }, 100);    
};

let emit = (command, payload) => {
    socket.emit(command, payload);
};