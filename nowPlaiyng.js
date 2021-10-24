const Command = require("../Structures/Command.js");
 
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "nowPlaying",
  description: "",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const vc = message.member.voice.channel;

    if (!vc) return message.reply("Please join a voice channel first!");

    if (!message.guild.me.permissions.has("CONNECT"))
      return message.reply("No permission to connect to that voice channel");

    let guildQueue = client.player.getQueue(message.guild.id);
    const ProgressBar = guildQueue.createProgressBar({
      block: "—",
      size: "10",
      arrow: "▷",
    });
    let embed = new MessageEmbed()
      .setTitle(`🎶ProgressBar🎶`)
      .setDescription(
        `**Now playing:** \`${guildQueue.nowPlaying}\`\n${ProgressBar.prettier}`
      )
      .setColor("BLURPLE");
    await message.channel.send({ embeds: [embed] });
  },
});