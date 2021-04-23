const DEFAULT_SPEED = 0.2;
const DEFAULT_ACTION_TIME = 1600;
const DEFAULT_REST_TIME = 500;
const arDrone = require('ar-drone');

function create() {
    let abortFlag = false;
    const client = arDrone.createClient();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function executeSequence(msg) {
        let actions = JSON.parse(msg);

        for (const element of actions) {
            if(!abortFlag){
                executeCommand(element, false);
                if(element.action === 'TAKE OFF'){
                    await sleep(3000);
                }
                await sleep(DEFAULT_ACTION_TIME);
                client.stop();
                await sleep(DEFAULT_REST_TIME);
            }
        }
        abortFlag = false;
    }

    function abort() {
        console.log("Aborting mission...");
        client.stop();
        abortFlag = true;
    }

    function executeCommand(msg, withStick = true) {
        let state;
        let speed;

        if (withStick) {
            let stick = JSON.parse(msg);
            state = stick.state;
            speed = validateParam(stick.speed);
        } else {
            state = msg.action;
            speed = DEFAULT_SPEED;
        }


        if (speed >= 0 && speed <= 1) {
            switch (state.toLowerCase()) {
                case "up":
                    console.log("up", speed);
                    client.up(speed);
                    break;
                case "down":
                    console.log("down", speed);
                    client.down(speed);
                    break;
                case "turn left":
                    console.log("turn left", speed);
                    client.counterClockwise(speed);
                    break;
                case "turn right":
                    console.log("turn right", speed);
                    client.clockwise(speed);
                    break;
                case "forward":
                    console.log("forward", speed);
                    client.front(speed);
                    break;
                case "backward":
                    console.log("backward", speed);
                    client.back(speed);
                    break;
                case "strafe left":
                    console.log("strafe left", speed);
                    client.left(speed);
                    break;
                case "strafe right":
                    console.log("strafe right", speed);
                    client.right(speed);
                    break;
                case "stop":
                    console.log("stop", speed);
                    client.stop();
                    break;
                case "take off":
                    console.log("takeoff");
                    client.takeoff();
                    break;
                case "land":
                    console.log("land");
                    client.stop();
                    client.land();
                    break;
                case "flip ahead":
                    console.log("flip ahead");
                    client.animate("flipAhead", 1000);
                    break;
                case "flip behind":
                    console.log("flip behind");
                    client.animate("flipBehind", 1000);
                    break;
                case "flip left":
                    console.log("flip left");
                    client.animate("flipLeft", 1000);
                    break;
                case "flip right":
                    console.log("flip right");
                    client.animate("flipRight", 1000);
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

    function validateParam(param){
        param = param == null ? DEFAULT_SPEED : param;

        if(param > 1 || param < 0){
            param = DEFAULT_SPEED;
        }

        return param;
    }

    return {executeSequence, abort, executeCommand};
}

module.exports = {create};