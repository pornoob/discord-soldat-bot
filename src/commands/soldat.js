import config from "../config.js";
import Discord from "discord.js";

let first_password = config.soldatserver.password;

export default {
  name: "soldat",
  context: {},
  execute(message, args) {
    if (!args.length) return;

    switch (args[0]) {
      case "server":
        const url = `soldat://${config.soldatserver.ip}:${config.soldatserver.port}/${config.soldatserver.password}`;
        const link = new Discord.MessageEmbed();
        link.setColor("#f4000e");
        link.setTitle("K4t4n4 Soldat Server");
        link.addField("#1", `[${url}](${url})`);
        message.channel.send(link);
        break;
      case "reset_password":
        message.channel.send(`\`\`\`setting password to: ${first_password}\`\`\``);
        this.context.soldat_client.write(`/PASSWORD ${first_password}\r\n`);
        config.soldatserver.password = first_password;
        break;
      case "msg":
        if (args.length < 2) return;
        message.channel.send(`\`\`\`Sending message to K4t4n4 Server\`\`\``);
        this.context.soldat_client.write(`/SAY ${message.author.username}: ${args.slice(1).join(" ")}\r\n`);
        break;
      case "help":
        message.channel.send(`\`\`\`
          !soldat server: returns the server URL.
          !soldat reset_password: sets the default soldat server password.
          !soldat msg: sends a message to K4t4n4 Server.
        \`\`\``)
        break;
    }
  }
}
