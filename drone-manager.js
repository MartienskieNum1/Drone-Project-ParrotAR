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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function execute(msg) {
        const mission = parseSequence(msg);
        console.log("Executing mission...");

        let action = JSON.parse(msg);

        action.forEach (
            async function (element) {
                for (let index = 0; index < 10; index++) {
                    executeStick(element, false); 
                    await sleep(100);
                }
                client.stop();
            }
            
        );

        /*
        mission.run(function (err, result) {
            if (err) {
                console.log("Error; landing drone...", err);
                mission.client().stop();
                mission.client().land();
            } else {
                console.log("Mission completed");
            }
        })
        */
    }

    function abort() {
        console.log("Aborting mission...");
        client.stop();
    }

    function executeStick(msg, withStick = true) {
        let state;
        let speed;

        if (withStick) {
            let stick = JSON.parse(msg);
            state = stick.state;
            speed = stick.speed;
        } else {
            state = getState(msg.action);
            speed = 0.2;
        }

        console.log("incoming");

        console.log(state);

        if (speed >= 0 && speed <= 1) {
            switch (state) {
                case "LeftStickUp":
                    client.up(speed);
                    client.after(500, () => client.stop());
                    break;
                case "LeftStickDown":
                    client.down(speed);
                    client.after(500, () => client.stop());
                    break;
                case "LeftStickLeft":
                    client.counterClockwise(speed);
                    client.after(500, () => client.stop());
                    break;
                case "LeftStickRight":
                    client.clockwise(speed);
                    client.after(500, () => client.stop());
                    break;
                case "RightStickUp":
                    client.front(speed);
                    client.after(500, () => client.stop());
                    break;
                case "RightStickDown":
                    client.back(speed);
                    client.after(500, () => client.stop());
                    break;
                case "RightStickLeft":
                    client.left(speed);
                    client.after(500, () => client.stop());
                    break;
                case "RightStickRight":
                    client.right(speed);
                    client.after(500, () => client.stop());
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
                    console.error("Unexpected stick state: " + state);
                    client.stop();
                    break;
            }
        } else {
            console.error("Unexpected speed value: " + speed);
            client.stop();
        }

    }

    function getState(action) {
        switch (action) {
            case "FORWARD":
                return "RightStickUp";
            case "LEFT":
                return "RightStickLeft";
            case "RIGHT":
                return "RightStickRight";
            case "BACKWARD":
                return "RightStickDown";
            case "UP":
                return "LeftStickUp";
            case "DOWN":
                return "LeftStickDown";
            case "TURN LEFT":
                return "LeftStickLeft";
            case "TURN RIGHT":
                return "RightStickUp";
            case "LAND":
                return "Land";
            case "TAKE OFF":
                return "Takeoff"
        
            default:
                break;
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