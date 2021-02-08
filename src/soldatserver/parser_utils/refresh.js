const MAX_PLAYERS = 32;

const KILLS_DEATH_BYTES = 2;
const MAP_BYTES = 16;
const NAME_BYTES = 24;
const ONE_BYTE = 1;

const TEAM_BYTES_OFFSET = MAX_PLAYERS * (NAME_BYTES + 1);
const KILLS_BYTES_OFFSET = TEAM_BYTES_OFFSET + MAX_PLAYERS;
const DEATHS_BYTES_OFFSET = KILLS_BYTES_OFFSET + MAX_PLAYERS * 2;
const PINGS_BYTES_OFFSET = DEATHS_BYTES_OFFSET + MAX_PLAYERS * 2;
const IDS_BYTES_OFFSET = PINGS_BYTES_OFFSET + MAX_PLAYERS;
const IPS_BYTES_OFFSET = IDS_BYTES_OFFSET + MAX_PLAYERS;
const INFO_BYTES_OFFSET = IPS_BYTES_OFFSET + MAX_PLAYERS * 4;

export default {
  players: null,
  players_count: 0,
  parse(data) {
    this.players = [];
    let UNKNOW_BYTES = MAX_PLAYERS * 2 - this.players_count * 2;

    const packet = Buffer.from(data);
    let buffer_position;

    for (let i = 0; i < MAX_PLAYERS; i++) {
      // Getting Name
      buffer_position = i * (NAME_BYTES + 1);

      let name_length = packet[buffer_position++];
      let name = "";
      for (let j = 0; j < name_length; j++) {
        name += String.fromCharCode(packet[buffer_position++]);
      }
      this.players.push({name});

      // Getting Team
      buffer_position = TEAM_BYTES_OFFSET + i;
      this.players[i].team = packet[buffer_position];

      // Getting Kills
      buffer_position = KILLS_BYTES_OFFSET + i * 2 + UNKNOW_BYTES;
      this.players[i].kills = (packet[buffer_position] | (packet[buffer_position + 1] << 8));

      // Getting Deaths
      buffer_position = DEATHS_BYTES_OFFSET + i * 2 + UNKNOW_BYTES;
      this.players[i].deaths = (packet[buffer_position] | (packet[buffer_position + 1] << 8));

      // Getting PING
      buffer_position = PINGS_BYTES_OFFSET + i + UNKNOW_BYTES;
      this.players[i].ping = packet[buffer_position];

      // Getting Player ID
      buffer_position = IDS_BYTES_OFFSET + i + UNKNOW_BYTES;
      this.players[i].id = packet[buffer_position];
    }

    this.players = this.players.filter(player => !!player.name);
    this.players_count = this.players.length;
    // console.log({players: this.players});
  }
};
