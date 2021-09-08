require("dotenv").config({path:"src/.env"});
const Client = require("./src/structures/Client.js")
    
    client = new Client({
        intents:513
    });
client.setup();