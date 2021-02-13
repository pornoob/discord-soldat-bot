import net from "net";

import commands from "./commands.js";
import Parser from "./parser.js";

export default {
  bot_nick: "CerdoBot",
  connect(soldatserver) {
    this.client = net.Socket();
    this.config = soldatserver;

    this.client.connect(this.config.port, this.config.ip, this.on_connect.bind(this));
    this.client.on("error", this.on_error.bind(this));
    this.client.on("timeout", this.on_error.bind(this));

    Parser.on("player_command", this.on_player_command.bind(this));
    Parser.on("server_message", this.on_server_message.bind(this));
    return this.client;
  },

  on_connect() {
    console.log("Connected to soldatserver admin console");
    console.log("Sending password: ****");
    this.client.write(`${this.config.admin_password}\r\n`);
    setTimeout(() => {
      this.client.write(`/SAY ${this.bot_nick} has been initialized\r\n`);
      this.client.write(`/SAY ${this.bot_nick}: Setting the password to ${this.config.password}\r\n`);
      this.client.write(`/PASSWORD ${this.config.password}\r\n`);
    }, 500);
  },

  on_close(error) {
    console.log("The connection to soldatserver has been closed");
    console.log({error});
  },
  
  on_data(data) {
    const data_str = data.toString();
    Parser.parse(data_str);
  },

  on_error(err) {
    console.log({err});
  },

  on_server_message(data) {
    console.log({server: data});
  },

  on_player_command(nickname, command, args) {
    for (let i = 0; i < commands.length; i++) {
      console.log(`Checking command: ${commands[i].name}`);
      for (let j = 0; j < commands[i].triggers.length; j++) {
        if (command.toLowerCase() === commands[i].triggers[j].toLowerCase()) {
          commands[i].context = {
            bot_nick: this.bot_nick,
            client: this.client,
            config: this.config,
          }
          commands[i].execute(nickname, args);
          return;
        }
      }
    }
  },
}
