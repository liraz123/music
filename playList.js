const Command = require("../Structures/Command.js");

const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "playList",
  description: "Play a song!",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const vc = message.member.voice.channel;

    if (!vc) return message.reply("Please join a voice channel first!");

    if (!message.guild.me.permissions.has("CONNECT"))
      return message.reply("No permission to connect to that voice channel");

    let guildQueue = client.player.getQueue(message.guild.id);
    if (!args.slice(1).join(" ")) {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Nothing to play!");

      return message.channel.send({ embeds: [embed] });
    }

    const playlistEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription("Searching `" + args.slice(1).join(" ") + "`");

    message.channel.send({ embeds: [playlistEmbed] });

    let playlistQueue = client.player.createQueue(message.guild.id, {
      data: { message: message, requesterTag: message.author.tag },
    });
    await playlistQueue.join(message.member.voice.channel);
    await playlistQueue.playlist(args.slice(1).join(" ")).catch((err) => {
      if (!guildQueue) {
        playlistQueue.stop();
      }
      console.log(err);
    });
  },
});