"use strict";

try {
    const arDrone = require('ar-drone');
    const client = arDrone.createClient();

    let options = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
    'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
    'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
    'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight']

    client.takeoff();

    client.animate('yawShake', 1000);

    /*
    options.forEach(function(option) {
        console.log(option);
        client.animate(option, 1000);
    });
    */

    client.after(4000, function(){
        this.stop();
        this.land();
    });
    
} catch (err){
    console.log("Error", err);
    return process.exit();
}
