import Discord from "discord.js";
import fs from "fs";

import config from "./config.js";
import Parser from "./parser.js";
import Soldat from "./soldatserver/client.js"

const client = new Discord.Client();
client.commands = new Discord.Collection();

const files = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));
for (const file of files) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.default.name, command.default);
}

client.on("message", (message) => { Parser.parse(message) });

Parser.on("command", (command, args, context) => {
  if (!client.commands.has(command)) return;
  client.commands.get(command).context = {
    soldat_client
  };
  client.commands.get(command).execute(context, args);
});

client.login(config.discord.BOT_TOKEN);

const soldat_client = Soldat.connect(config.soldatserver);
const first_password = config.soldatserver.password;

soldat_client.on('discord_message', (nickname, message) => {
  console.log(`discord message fired by ${nickname}`);
  let channel = client.channels.cache.find(channel => channel.name === config.discord.channel);
  channel.send(` 
    > \`${nickname}: ${message}\`
    `
  );
});

soldat_client.on("data", Soldat.on_data);
soldat_client.on("close", Soldat.on_close);
