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
        switch(action){
            case "Forward":
                mission.forward(param);
                break;
            case "Backward":
                mission.backward(param);
                break;
        }
    }

    return { parseSequence, execute, abort };
}

module.exports = { create };