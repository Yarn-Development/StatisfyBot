const { Client } = require("discord.js");
const fs = require("fs");
class ExtendedClient extends Client {
    constructor(...options) {
    super(...options);
    this.slash = new Map();
    this.events = new Map();
    this.commands = new Map();
    }
    setup(token = process.env.TOKEN) {
        if(!token) throw new Error("No token provided.");
        this.login(token);
        this.loadSlash();
        this.loadHandlers();
    }
    loadSlash() {
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
                const slashcmd = require(`./commands/${file}`);
               
        this.on("ready", async () => {
           await this.applications.commands.set(slashcmd)
        });
      };
      return this;
    }
    loadHandlers() {
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        this.commands.set(command.data.name, command);
    };
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        this.on(eventName, event.bind(null, client));
        }; 
        return this;
    }

}
module.exports = ExtendedClient;