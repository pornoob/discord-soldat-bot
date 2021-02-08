import Discord from "discord.js";
import config from "./config.js";
import Parser from "./parser.js";
import Soldat from "./soldatserver/client.js"

const client = new Discord.Client();

client.on("message", (message) => { Parser.parse(message) });

client.login(config.discord.BOT_TOKEN);

const soldat_client = Soldat.connect(config.soldatserver);

soldat_client.on("data", Soldat.on_data);
soldat_client.on("close", Soldat.on_close);
