const Discord = require('discord.js');

const fs = require("fs");

// Create config
try {
    require("./config.json");
} catch {
    console.log("Creating config.json file from config.json.example...");

    fs.copyFile("./config.json.example", "./config.json", (err) => {
        if (err) {
            console.log("Error Found:", err);
        }
    });
}

// Load config
const config = require("./config.json");

// Create client
const client = new Discord.Client({
    ws: {
        intents: config.intents
    }
});

// Assign config to Client
client.config = config;

// Load modules
client.modules = new Discord.Collection();
const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('.js'));
for (const file of moduleFiles) {
    const module = require(`./modules/${file}`);

    client.modules.set(module.name.toString(), module);

    // Log that the module is loading
    console.log(`Loading module: ${module.name} (${client.modules.size.toString()}/${moduleFiles.length})`)

    // Load it
    module.load(client);
}

// Client login
client.login(client.config.token).then();