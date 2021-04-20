"use strict";
try {
    const arDrone = require('ar-drone');
    const autonomy = require('ardrone-autonomy');

    const client = arDrone.createClient();
    let mission  = autonomy.createMission();

    mission.takeoff()
        .zero()
        .altitude(1)
        .forward(2)
        .hover(1000)
        .right(2)
        .hover(1000)
        .backward(2)
        .hover(1000)
        .left(2)
        .hover(1000)
        .land();

    mission.run(function (err, result) {
        if (err) {
            console.log("Error", err);
            mission.client().stop();
            mission.client().land();
        } else {
            console.log("mission completed");
            process.exit(0);
        }
    })


} catch (err){
    console.log("Error", err);
    process.exit(1);
}