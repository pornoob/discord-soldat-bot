import Discord from "discord.js";
import config from "./config.js";
import Parser from "./parser.js";
import Soldat from "./soldatserver/client.js"

const client = new Discord.Client();

client.on("message", (message) => { Parser.parse(message) });

Parser.on("command", (command, args, context) => {
  switch (command) {
    case "soldat":
      if (args.length) {
        switch (args[0]) {
          case "server":
            const url = `soldat://${config.soldatserver.ip}:${config.soldatserver.port}/${config.soldatserver.password}`;
            const link = new Discord.MessageEmbed();
            link.setColor("#f4000e");
            link.setTitle("K4t4n4 Soldat Server");
            link.addField("#1", `[${url}](${url})`);
            context.channel.send(link);
            break;
          case "reset_password":
            context.channel.send(`\`\`\`setting password to: ${first_password}\`\`\``);
            soldat_client.write(`/PASSWORD ${first_password}\r\n`);
            config.soldatserver.password = first_password;
            break;
        }
      }
      break;
    case "msg":
      if (!args.length) break;
      context.channel.send(`\`\`\`Sending message to K4t4n4 Server\`\`\``);
      soldat_client.write(`/SAY ${context.author.username}: ${args.join(" ")}\r\n`);
      break;
    case "test":
      break;
  }
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
