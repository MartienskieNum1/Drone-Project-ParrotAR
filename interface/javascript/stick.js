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
                keyboardData.state = "Take off";
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

let KeyPressed = {
    ZPressed: false,
    SPressed: false,
    QPressed: false,
    DPressed: false,
    OPressed: false,
    LPressed: false,
    KPressed: false,
    MPressed: false
};

const possibleKeys = ['z', 's', 'q', 'd', 'o', 'l', 'k', 'm'];

let navigateDown = (e) => {
    keyboardData.speed = keyboardSpeed;
    if (keyboardChbx.checked) {
        if (e.key == 'z' && !KeyPressed.ZPressed) {
            keyboardData.state = "up";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.ZPressed = true;
        } else if (e.key == 's' && !KeyPressed.SPressed) {
            keyboardData.state = "down";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.SPressed = true;
        } else if (e.key == 'q' && !KeyPressed.QPressed) {
            keyboardData.state = "turn left";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.QPressed = true;
        } else if (e.key == 'd' && !KeyPressed.DPressed) {
            keyboardData.state = "turn right";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.DPressed = true;
        } else if (e.key == 'o' && !KeyPressed.OPressed) {
            keyboardData.state = "forward";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.OPressed = true;
        } else if (e.key == 'l' && !KeyPressed.LPressed) {
            keyboardData.state = "backward";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.LPressed = true;
        } else if (e.key == 'k' && !KeyPressed.KPressed) {
            keyboardData.state = "strafe left";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.KPressed = true;
        } else if (e.key == 'm' && !KeyPressed.MPressed) {
            keyboardData.state = "strafe right";
            emit("executeStick", JSON.stringify(keyboardData));
            KeyPressed.MPressed = true;
        }
    }
};

let navigateUp = (e) => {
    keyboardData.speed = 0;
    keyboardData.state = "hover";
    if (keyboardChbx.checked) {
        if (possibleKeys.includes(e.key)) {
            switch (e.key) {
                case 'z':
                    KeyPressed.ZPressed = false;
                    break;
                case 's':
                    KeyPressed.SPressed = false;
                    break;
                case 'q':
                    KeyPressed.QPressed = false;
                    break;
                case 'd':
                    KeyPressed.DPressed = false;
                    break;
                case 'o':
                    KeyPressed.OPressed = false;
                    break;
                case 'l':
                    KeyPressed.LPressed = false;
                    break;
                case 'k':
                    KeyPressed.KPressed = false;
                    break;
                case 'm':
                    KeyPressed.MPressed = false;
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
        data.state = "Take off"
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
    
        if (x != 0 && y != 0) {
            if (y > 0 && y > Math.abs(x)) {
                data.state = "up";
                data.speed = y / 100;
            } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
                data.state = "down";
                data.speed = y / 100 * -1;
            } else if (x > 0 && x > Math.abs(y)) {
                data.state = "turn right";
                data.speed = x / 100;
            } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
                data.state = "turn left";
                data.speed = x / 100 * -1;
            }

            if (data.speed > 1) {
                data.speed = 1
            }
        
            emit("executeStick", JSON.stringify(data));
            sentNeutral = false;

        } else {
            if (!sentNeutral) {
                data.state = "hover";
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
    
        if (x!= 0 || y != 0) {
            if (y > 0 && y > Math.abs(x)) {
                data.state = "forward";
                data.speed = y / 100;
            } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
                data.state = "backward";
                data.speed = y / 100 * -1;
            } else if (x > 0 && x > Math.abs(y)) {
                data.state = "right";
                data.speed = x / 100;
            } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
                data.state = "left";
                data.speed = x / 100 * -1;
            } else {
                data.state = "hover";
                data.speed = 0;
            }    
        

            if (data.speed > 1) {
                data.speed = 1
            }
        
            emit("executeStick", JSON.stringify(data));
            sentNeutral = false;

        } else {
            if (!sentNeutral) {
                data.state = "hover";
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