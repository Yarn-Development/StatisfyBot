require("dotenv").config();
const { Client, Collection, Intents} = require("discord.js");
const { readdirSync } = require("fs")
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
    client.commands = new Collection();

client
    .on("error", console.error)
    .on("warn", console.warn)
    .on("debug",console.log)
    .login(process.env.TOKEN);