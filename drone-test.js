const arDrone = require('ar-drone');
const client = arDrone.createClient();

client.config('general:navdata_demo', 'FALSE');
client.on('navdata', (data)=>{
    console.log(data['dronestate']);
});
client.createRepl();