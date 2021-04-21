const arDrone = require('ar-drone');
const autonomy = require('ardrone-autonomy');

function create() {


    function parseCommandList() {
        console.log("Parsing the command list...");
    }

    function execute() {
        console.log("Executing mission...");
    }

    function abort() {
        console.log("Aborting mission...");
    }

    return { parseCommandList, execute, abort };
}

module.exports = { create };