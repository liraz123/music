const Command = require("../Structures/Command.js");

module.exports = new Command({
  name: "stop",
  description: "",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const vc = message.member.voice.channel;

    if (!vc) return message.reply("Please join a voice channel first!");

    if (!message.guild.me.permissions.has("CONNECT"))
      return message.reply("No permission to connect to that voice channel");

    let queue = client.player.createQueue(message.guild.id);
    queue.stop();
    message.channel.send({ content: `Stoping...` }).then((msg) => {
      setTimeout(() => msg.delete(), 1666);
    });
  },
});