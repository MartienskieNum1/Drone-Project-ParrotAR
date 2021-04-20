"use strict";
try {
    const arDrone = require('ar-drone');
    const client = arDrone.createClient();
    console.log(client);

    client.takeoff();
    console.log(client);
    client.after(2000, function(){
        this.front(0.5);
    })
    client.after(4000, function(){
        this.stop();
        this.land();
        console.log(client);
    });

} catch (err){
    console.log("Error", err);
    return process.exit();
}