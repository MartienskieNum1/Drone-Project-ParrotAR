const DEFAULT_METER = 1;
const DEFAULT_DEGREE = 90;
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
        console.log("incoming");

        if (stick.speed >= 0 && stick.speed <= 1) {
            switch (stick.state) {
                case "LeftStickUp":
                    client.up(stick.speed);
                    break;
                case "LeftStickDown":
                    client.down(stick.speed);
                    break;
                case "LeftStickLeft":
                    client.counterClockwise(stick.speed);
                    break;
                case "LeftStickRight":
                    client.clockwise(stick.speed);
                    break;
                case "RightStickUp":
                    client.front(stick.speed);
                    break;
                case "RightStickDown":
                    client.back(stick.speed);
                    break;
                case "RightStickLeft":
                    client.left(stick.speed);
                    break;
                case "RightStickRight":
                    client.right(stick.speed);
                    break;
                case "StickNeutral":
                    client.stop();
                    break;
                case "Takeoff":
                    client.takeoff();
                    break;
                case "Land":
                    client.stop();
                    client.land();
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

    function appendMission(mission, action, param){
        switch(action.toLowerCase()){
            case "forward":
                param = validateParamMeter(param);
                mission.forward(param);
                break;
            case "backward":
                param = validateParamMeter(param);
                mission.backward(param);
                break;
            case "left":
                param = validateParamMeter(param);
                mission.left(param);
                break;
            case "right":
                param = validateParamMeter(param);
                mission.right(param);
                break;
            case "take off":
                mission.takeoff();
                break;
            case "land":
                mission.land();
                break;
            case "turn left":
                param = validateParamDegree(param);
                mission.ccw(param);
                break;
            case "turn right":
                param = validateParamDegree(param);
                mission.cw(param);
                break;
            case "up":
                param = validateParamMeter(param);
                mission.up(param);
                break;
            case "down":
                param = validateParamMeter(param);
                mission.down(param);
                break;
        }
    }

    function validateParamMeter(param){
        param = param == null ? DEFAULT_METER : param;

        if(param > 50 || param < 0){
            param = DEFAULT_METER;
        }

        return param;
    }
    function validateParamDegree(param){
        param = param == null ? DEFAULT_DEGREE : param;

        if(param > 360 || param < 0){
            param = DEFAULT_DEGREE;
        }

        return param;
    }

    return {execute, abort, executeStick};
}

module.exports = {create};