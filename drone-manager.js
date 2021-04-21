const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {


    function parseSequence() {
        console.log("Parsing the sequence...");
    }

    function execute() {
        parseSequence();
        console.log("Executing mission...");
    }

    function abort() {
        console.log("Aborting mission...");
    }

    return { execute, abort };
}

module.exports = { create };