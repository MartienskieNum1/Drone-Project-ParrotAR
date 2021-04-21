"use strict";

try {
    const arDrone = require('ar-drone');
    const client = arDrone.createClient();

    console.log("taking off...");
    client.takeoff();

    client
    .after(2500, function(){
        console.log("moving forwards...");
        this.front(0.25);
    }).after(2500, function(){
        console.log("moving to the right...");
        this.right(0.25);
    }).after(2500, function(){
        console.log("moving backwards...");
        this.back(0.25);
    }).after(2500, function(){
        console.log("moving to the left...");
        this.left(0.25);
    });

    client.after(2500, function(){
        console.log("landing")
        this.stop();
        this.land();
    });
    
} catch (err){
    console.log("Error", err);
    return process.exit();
}
