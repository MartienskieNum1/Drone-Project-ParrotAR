const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {
    const client = arDrone.createClient();

    function parseSequence(msg) {
        let mission = autonomy.createMission();

        let actions = JSON.parse(msg);

        for (const a of actions) {
            appendMission(mission, a.action, a.param);
        }

        return mission;
    }


    function execute(msg) {
        const mission = parseSequence(msg);
        console.log(mission);
        console.log("Executing mission...");

        mission.run(function (err, result) {
            if (err) {
                console.log("Error; landing drone...", err);
                mission.client().stop();
                mission.client().land();
            } else {
                console.log("Mission completed");
            }
        })
    }

    function abort() {
        console.log("Aborting mission...");
        client.stop();
    }

    function appendMission(mission, action, param) {
        switch (action) {
            case "Forward":
                mission.forward(param);
                break;
            case "Backward":
                mission.backward(param);
                break;
            case "Left":
                mission.left(param);
                break;
            case "Right":
                mission.right(param);
                break;
            case "Take off":
                mission.takeoff();
                break;
            case "Land":
                mission.land();
                break;
            case "Turn Left":
                mission.ccw(param);
                break;
            case "Turn Right":
                mission.cw(param);
                break;
            case "Up":
                mission.up(param);
                break;
            case "Down":
                mission.down(param);
                break;
        }
    }

    return {execute, abort};
}

module.exports = {create};