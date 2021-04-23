const DEFAULT_SPEED = 0.2;
const arDrone = require('ar-drone');

function create() {
    const client = arDrone.createClient();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function executeSequence(msg) {
        let actions = JSON.parse(msg);

        for (const element of actions) {
                for (let index = 0; index < 10; index++) {
                    executeCommand(element, false);
                    await sleep(100);
                }
                client.stop();
                await sleep(1000);
            
        }
    }

    function abort() {
        console.log("Aborting mission...");
        client.stop();
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
                    console.log("up");
                    client.up(speed);
                    break;
                case "down":
                    console.log("down");
                    client.down(speed);
                    break;
                case "turn left":
                    console.log("turn left");
                    client.counterClockwise(speed);
                    break;
                case "turn right":
                    console.log("turn right");
                    client.clockwise(speed);
                    break;
                case "forward":
                    console.log("forward");
                    client.front(speed);
                    break;
                case "backward":
                    console.log("backward");
                    client.back(speed);
                    break;
                case "left":
                    console.log("left");
                    client.left(speed);
                    break;
                case "right":
                    console.log("right");
                    client.right(speed);
                    break;
                case "hover":
                    console.log("hover");
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