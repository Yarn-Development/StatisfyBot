const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Fetch latency information of the bot'),
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