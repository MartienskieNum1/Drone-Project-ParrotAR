# Drone Project

This web application makes use of Node.js as backend to communicate with a Parrot AR.Drone 2.0. The goal for this project was to create a new way for the drone to be used which does not exist in the Parrot mobile application.

The new functionality gives the user the possibiliy to queue up commands which are executed by the drone when the 'execute' button is pressed.

## How to run
First of all, Node.js needs to be installed on your system. You can find [here](https://phoenixnap.com/kb/install-node-js-npm-on-windows) how.

After cloning this repo, open your CLI and navigate to this repo. Now, use `npm install` to install the necessary packages.

Next up, connect your device with the drone over WiFi.

Finally run `node server.js` to start the server and browse to [localhost:8000](http://localhost:8000).