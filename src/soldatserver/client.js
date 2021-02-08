import net from "net";
import PauseCommand from "./commands/pause.js";
import MapsCommand from "./commands/maps.js";
import GameMode from "./gamemodes.js";

import Parser from "./parser.js";
import RefreshParser from "./parser_utils/refresh.js";
import ServerMessageParser from "./parser_utils/server.js";

export default {
  refresh_detected: false,
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
    const refresh_command = "REFRESH\r\n";
    if (data.startsWith(refresh_command)) {
      console.log("REFRESH Detected!")
      RefreshParser.parse(data.slice(refresh_command.length));
    } else if (data.length === 1188) {
      console.log("REFRESH Detected!")
      RefreshParser.parse(data); 
    } else {
      console.log({server: data});
      if (data.indexOf("has joined") !== -1) this.client.write(`REFRESH\r\n`);
      else if (data.indexOf("has left") !== -1) this.client.write(`REFRESH\r\n`);
    }
  },

  on_player_command(nickname, command, args) {
    switch (command) {
      case "!gm":
      case "!gamemode":
        if (!args.length) return;
        this.client.write(`/gamemode ${GameMode[args[0].toUpperCase()]}\r\n`);
      case "!hello": this.client.write(`/say CerdoBot: Oing! Hello ${nickname}\r\n`);break;
      case "!map": this.client.write(`/map ${args[0]}\r\n`);break;
      case "!p":
      case "!pause":
        PauseCommand.pause(this.client);break;
        break;
      case "!up":
      case "!unpause":
        PauseCommand.unpause(this.client);break;
      case "!r":
      case "!restart":
        this.client.write(`/restart\r\n`);break;
      case "!1":
      case "!a":
        break;
      case "!maps": MapsCommand.maps(this.client, 0);break
      case "!maps2": MapsCommand.maps(this.client, 1);break
      case "!ub":
      case "!unban":
        this.client.write(`/UNBANLAST\r\n`);
        this.client.write(`/SAY CerdoBot: UNBANLAST\r\n`);
      case "!test":
        this.client.write(`REFRESH\r\n`);break;
    }
  },
}
