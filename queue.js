const Command = require("../Structures/Command.js");

const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "queue",
  description: "",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    try {
      const vc = message.member.voice.channel;

      if (!vc) return message.reply("Please join a voice channel first!");

      if (!message.guild.me.permissions.has("CONNECT"))
        return message.reply("No permission to connect to that voice channel");

      let guildQueue = client.player.getQueue(message.guild.id);

      if (guildQueue.songs) {
        const Queuemap = guildQueue.songs
          .map(
            (song, index) =>
              `**${index + 1})** [\`${song.name}\`](${song.url}) - ${
                song.duration
              }`
          )
          .join(",\n");
        const queueEmbed = new MessageEmbed()
          .setFooter(
            `Requested by: ${message.author.username}`,
            message.author.displayAvatarURL()
          )
          .setTimestamp()
          .setTitle(`🎶 The music queue for ${message.guild.name}`)
          .setDescription(
            `
          Now Playing: [\`${guildQueue.nowPlaying.name}\`](${
              guildQueue.nowPlaying.url
            }) \`- ${guildQueue.nowPlaying.duration}\`\n
          \n${Queuemap ? Queuemap : "There are currently no songs in queue."}`
          )
          .setThumbnail(guildQueue.nowPlaying.thumbnail)
          .setColor("RANDOM");
        message.channel.send({ embeds: [queueEmbed] });
      } else if (!message.guild.me.voice.channel) {
        const NotConnectedEmbed = new MessageEmbed()
          .setTitle("Not Connected")
          .setDescription("I am not connected to any voice channel")
          .setColor("#ff0000")
          .setFooter(
            `Requested by: ${message.author.username}`,
            message.author.displayAvatarURL()
          );

        message.channel.send({ embeds: [NotConnectedEmbed] });
      }
    } catch (error) {
      //   const queue = client.player.createQueue(message.guild.id);
      //   queue.connection.leave();
      message.channel.send({ content: `${error}` });
    }
  },
});