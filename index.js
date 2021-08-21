require("dotenv").config();
const { Client, GuildMember, Intents, DiscordAPIError } = require("discord.js")
    config = require("./config")
    client = new Client({
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.DIRECT_MESSAGES
        ]
    });
client.on("ready",() => {
    console.log(`Logged in as ${client.user.tag}!`);
})
    .on("error", console.error)
    .on("warn", console.warn)
client.login(process.env.TOKEN)