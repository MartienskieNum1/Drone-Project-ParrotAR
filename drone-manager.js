const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {


    function parseSequence() {
        console.log("Parsing the sequence...");
    }

    function execute() {
        console.log("Executing mission...");
    }

    function abort() {
        console.log("Aborting mission...");
    }

    return { parseSequence, execute, abort };
}

module.exports = { create };