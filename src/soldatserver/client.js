import net from "net";

import FileSystem from "./fileSystem.js";
import GameMode from "./gamemodes.js";

import PauseCommand from "./commands/pause.js";
import MapsCommand from "./commands/maps.js";

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
    setInterval(() => {
      this.client.write(`REFRESH\r\n`);
    }, 300);
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
    const idx = data.indexOf(refresh_command);
    if (idx !== -1) {
      RefreshParser.parse(data.slice(idx + refresh_command.length));
    } else {
      console.log({server: data});
    }
  },

  on_player_command(nickname, command, args) {
    let player;
    switch (command) {
      case "!gm":
      case "!gamemode":
        if (!args.length) return;
        this.client.write(`/gamemode ${GameMode[args[0].toUpperCase()]}\r\n`);
      case "!hello": this.client.write(`/say CerdoBot: Oing! Hello ${nickname}\r\n`);break;
      case "!map":
        if (!args.length) return;
        let map = FileSystem.maps.find(map => map.toUpperCase().indexOf(args[0].toLowerCase()) !== -1);
        this.client.write(`/map ${map}\r\n`);
        break;
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
      case "!alpha":
        player = RefreshParser.players.find(player => player.name === nickname);
        this.client.write(`/SETTEAM1 ${player.id}\r\n`);
        break;
      case "!2":
      case "!b":
      case "!bravo":
        player = RefreshParser.players.find(player => player.name === nickname);
        this.client.write(`/SETTEAM2 ${player.id}\r\n`);
        break;
      case "!3":
      case "!c":
      case "!charlie":
        let player = RefreshParser.players.find(player => player.name === nickname);
        this.client.write(`/SETTEAM3 ${player.id}\r\n`);
        break;
      case "!4":
      case "!d":
      case "!delta":
        player = RefreshParser.players.find(player => player.name === nickname);
        this.client.write(`/SETTEAM4 ${player.id}\r\n`);
        break;
      case "!5":
      case "!s":
      case "!spec":
        player = RefreshParser.players.find(player => player.name === nickname);
        this.client.write(`/SETTEAM5 ${player.id}\r\n`);
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
