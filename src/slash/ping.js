const { MessageEmbed } = require("discord.js")
module.exports = {
  name: 'ping',
  description:'Fetch the bot\'s current latency',
	async execute(interaction) {
      await interaction.deferReply();
        const reply = interaction.editReply('Pinging...');
          const trip = Math.floor(reply.createdTimestamp - interaction.createdTimestamp);
          const embed = new MessageEmbed()
              .setTitle('Pong!')
              .addField('API Latency', `${Math.round(interaction.client.ws.ping)}ms`, true)
              .addField('Client Latency', `${trip}ms`, true)
              .setColor("RANDOM")
              .setTimestamp()
      interaction.editReply({embeds:[embed]})
    },
};