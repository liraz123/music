/** @format */

console.clear();

const Client = require("./Structures/Client.js");

const config = require("./Data/config.json");

const client = new Client();

client.start(config.token);

const { Player } = require("discord-music-player");

const player = new Player(client, {
  leaveOnEmpty: false,
  leaveOnStop: true,
  deafenOnJoin: true,
  volume: 100,
  quality: "high",
  timeout: "30000",
});

client.player = player;