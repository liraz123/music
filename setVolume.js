const Command = require("../Structures/Command");

const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "setVolume",
  description: "",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const volume = args[1];
    const vc = message.member.voice.channel;

    if (!vc) return message.reply("Please join a voice channel first!");

    if (!message.guild.me.permissions.has("CONNECT"))
      return message.reply("No permission to connect to that voice channel");

    if (volume > 100)
      return message.reply(
        "<a:warn_:878917634668781629> You cannot increase more volume than 100!"
      );

    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.setVolume(parseInt(volume));
    const embed = new MessageEmbed().setTitle(
      `Volume has been set to ${volume}`
    );
    message.channel.send({ embeds: [embed] });
  },
});