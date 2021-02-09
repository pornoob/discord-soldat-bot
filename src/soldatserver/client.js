import net from "net";

import FileSystem from "./filesystem.js";
import GameMode from "./gamemodes.js";

import PauseCommand from "./commands/pause.js";
import MapsCommand from "./commands/maps.js";

import Parser from "./parser.js";
import ServerMessageParser from "./parser_utils/server.js";

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
      case "!hello": this.client.write(`/say ${this.bot_nick}: Oing! Hello ${nickname}\r\n`);break;
      case "!map":
        if (!args.length) return;
        let maps = FileSystem.maps.filter(map => {
          return map.toLowerCase().indexOf(args[0].toLowerCase()) !== -1 &&
          map.length - args[0].length <= 4;
        });
        console.log({maps});
        if (maps.length) {
          let map = maps[0];
          const regex = /^(ctf|htf|inf)_/;
          let map1_length = regex.test(map) ? map.length - 4 : map.length;
          let map2_length = 0;
          for (let i = 1; i < maps.length; i++) {
            map2_length = regex.test(maps[i]) ? maps[i].length - 4 : maps[i].length;
            if (map2_length <= map1_length) {
              map = maps[i];
              map1_length = map2_length;
            }
          }
          this.client.write(`/map ${map}\r\n`);
        } else this.client.write(`/map ${args[0]}\r\n`);
        break;
      case "!maps": MapsCommand.maps(this.client, 0);break
      case "!maps2": MapsCommand.maps(this.client, 1);break
      case "!ub":
      case "!unban":
        this.client.write(`/UNBANLAST\r\n`);
        this.client.write(`/SAY ${this.bot_nick}: UNBANLAST\r\n`);
      case "!test":
        this.client.write(`REFRESH\r\n`);break;
    }
  },
}
