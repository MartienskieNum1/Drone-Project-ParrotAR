var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const droneManager = require('./drone-manager').create();

app.use(express.static(path.join(__dirname, 'interface')));

io.on("connection", acceptConnection);

server.listen(8000, () => {
    console.log("listening on 8000");
});

server.on('error', onError);

function acceptConnection(socket) {
    console.log("Connection received ...");
    socket.on('execute', (msg) => {
        console.log('Execute received', msg);
        droneManager.execute(msg);
    });
    socket.on('abort', (msg) => {
        console.log('Abort');
        droneManager.abort();
    })
}

function onError(error) {
    console.error(error)
}