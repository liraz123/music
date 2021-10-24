const Command = require("../Structures/Command.js");

const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "play",
  description: "Play a song!",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const vc = message.member.voice.channel;

    if (!vc) return message.reply("Please join a voice channel first!");

    if (!message.guild.me.permissions.has("CONNECT"))
      return message.reply("No permission to connect to that voice channel");

    const query = args.slice(1).join(" ");
    if (!query) return message.channel.send("Please provide a song to play!");

    let queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.play(args.slice(1).join(" ")).catch((_) => {
      if (!queue) queue.stop();
    });
    const embed = new MessageEmbed()
      .setDescription(`Started playing : **${song}** `)
      .setTimestamp()
      .setColor("#00ff00");
    message.channel.send({ embeds: [embed] });
  },
});