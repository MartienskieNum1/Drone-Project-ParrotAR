const DEFAULT_METER = 1;
const DEFAULT_DEGREE = 90;
const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {
    function parseSequence(msg) {
        let mission  = autonomy.createMission();

        let actions = JSON.parse(msg);

        for(const action of actions){
            appendMission(mission, a.action, a.param);
        }

        return mission;
    }

    function execute(msg) {
        const mission = parseSequence(msg);
        console.log(mission);
        console.log("Executing mission...");
    }

    function abort() {
        console.log("Aborting mission...");
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

    return { execute, abort };
}

module.exports = { create };