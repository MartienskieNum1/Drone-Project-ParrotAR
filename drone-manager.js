const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {


    function parseSequence(sequence) {
        let mission  = autonomy.createMission();

        // TODO: add sequence instructions to mission

        return mission;
    }

    function execute(sequence) {
        let mission = parseSequence(sequence);

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
    }

    return { execute, abort };
}

module.exports = { create };