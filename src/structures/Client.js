const { Client } = require("discord.js");
const fs = require("fs");
let slash = [];
const config = require("../config.json")
class ExtendedClient extends Client {
    constructor(...options) {
    super(...options);
    this.slash = new Map();
    this.events = new Map();
    this.commands = new Map();
    this.config = config
    }
    setup(token = process.env.TOKEN) {
        if(!token) throw new Error("No token provided.");
        this.login(token);
        this.loadHandlers();
    }
 
    loadHandlers() {

        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        this.commands.set(command.help.name, command);
    };
    const slashcommandFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));
    for (const file of slashcommandFiles) {
            const slashcmd = require(`../slash/${file}`);
            slash.push(slashcmd)
            this.slash.set(slashcmd.name,slashcmd)
            this.on("ready", async () => {
                await this.application.commands.set(slash)
             });
 
  };
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split(".")[0]
        this.on(eventName, event.bind(null, client));
        }; 
        return this;
    }

}
module.exports = ExtendedClient, slash;