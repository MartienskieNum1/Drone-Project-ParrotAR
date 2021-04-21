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

    function executeStick(msg) {
        let stick = JSON.parse(msg);

        if (stick.speed >= 0 && stick.speed <= 1) {
            switch (stick.state) {
                case "LeftStickUp":
                    client.up(stick.speed).after(500, () => client.stop());
                    break;
                case "LeftStickDown":
                    client.down(stick.speed).after(500, () => client.stop());
                    break;
                case "LeftStickLeft":
                    client.counterClockwise(stick.speed).after(500, () => client.stop());
                    break;
                case "LeftStickRight":
                    client.clockwise(stick.speed).after(500, () => client.stop());
                    break;
                case "RightStickUp":
                    client.front(stick.speed).after(500, () => client.stop());
                    break;
                case "RightStickDown":
                    client.back(stick.speed).after(500, () => client.stop());
                    break;
                case "RightStickLeft":
                    client.left(stick.speed).after(500, () => client.stop());
                    break;
                case "RightStickRight":
                    client.right(stick.speed).after(500, () => client.stop());
                    break;
                case "StickNeutral":
                    client.stop();
                    break;
                default:
                    console.error("Unexpected stick state: " + stick.state);
                    client.stop();
                    break;
            }
        } else {
            console.error("Unexpected speed value: " + stick.speed);
            client.stop();
        }

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

    return {execute, abort, executeStick};
}

module.exports = {create};