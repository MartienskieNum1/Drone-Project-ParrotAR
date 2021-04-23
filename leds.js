"use strict";

try {
    const arDrone = require('ar-drone');
    const client = arDrone.createClient();

    let options = 
    ['blinkGreenRed', 'blinkGreen', 'blinkRed', 'blinkOrange', 'snakeGreenRed',
    'fire', 'standard', 'red', 'green', 'redSnake', 'blank', 'rightMissile',
    'leftMissile', 'doubleMissile', 'frontLeftGreenOthersRed',
    'frontRightGreenOthersRed', 'rearRightGreenOthersRed',
    'rearLeftGreenOthersRed', 'leftGreenRightRed', 'leftRedRightGreen',
    'blinkStandard'];

    options.forEach(function(option) {
        console.log(option);
        client.animateLeds(option, 5, 2);
    });
    
} catch (err){
    console.log("Error", err);
    return process.exit();
}
