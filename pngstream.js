"use strict";

try {
    var arDrone = require('ar-drone');
    var http    = require('http');

    console.log('Connecting to drone video stream ...');

    var client = arDrone.createClient();

    //require('ar-drone-png-stream')(client,{port:8000})

    // client.config('video:video_channel', 0);
    // client.config('video:video_channel', 3);

    var pngStream = client.getPngStream();
    var lastPng;

    pngStream
        .on('error', function(error){
            console.log("Error occurred: " + error);
        })
        .on('data', function(pngBuffer) {
            lastPng = pngBuffer;
        });

    var server = http.createServer(function(req, res) {
        if (lastPng) {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(lastPng);
        } else {
            res.writeHead(503);
            res.end('No stream data recieved.');
        }
    });

    server.listen(8000, function() {
        console.log('Serving latest png on port 8000 ...');
    });

} catch (err) {
    console.log("Error", err);
    return process.exit();
}
