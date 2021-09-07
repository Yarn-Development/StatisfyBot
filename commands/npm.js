const fetch = require("node-fetch")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
data: new SlashCommandBuilder()
.setName("npm")
.setDescription("Get extra info on an npm package!")
.addStringOption(option =>
option.setName('package')
.setDescription('NPM package to get info from')
.setRequired(true)),
async execute(interaction) {

await interaction.deferReply();
const npm = await interaction.options.getString("package")
  if (!npm) {
    return interaction.followUp({content:
        '**:point_right: Please make sure to mention a npm.**', ephemeral :true}
    );
  }
  let response;
  try {
    response = await fetch('https://api.npms.io/v2/search?q=' + npm).then(
        (res) => res.json(),
    );
  } catch (err) {
    return interaction.followUp({content:'**:no_entry_sign: I think an error occured...**',ephemeral :true});
    console.log(err)
  }
  try {
    const pkg = response.results[0].package;
    const npmbed = new MessageEmbed()
        .setTitle(pkg.name)
        .setColor('#ED5E5E')
        .setURL(pkg.links.npm)
        .setThumbnail(
            'https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png',
        )
        .setDescription(pkg.description)
        .addField('Creator:', pkg.author ? pkg.author.name : 'None')
        .addField('Package Version:', pkg.version)
        .addField(
            'Github Repository:',
        pkg.links.repository ? pkg.links.repository : 'None',
        )
        .addField(
            'Package Maintainers:',
        pkg.maintainers ?
          pkg.maintainers.map((e) => e.username).join(', ') :
          'None',
        )
        .addField('Keywords:', pkg.keywords ? pkg.keywords.join(', ') : 'None')
        .setTimestamp();
    interaction.followUp({embeds: [npmbed]});
  } catch (err) {
    console.warn(err);
    interaction.followUp({content:'**I could not find your package in npm...jc95pU2eXLKGwWdh** ', ephemeral :true});
  }

},
};

