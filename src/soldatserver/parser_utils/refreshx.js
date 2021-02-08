const MAX_PLAYERS = 32;
const NAME_MAX_LENGTH = 24;
const HWID_LENGTH = 12;
const KILLS_DEATH_LENGTH = 2;

export default {
  players: [],
  parse(data) {
    this.players = [];

    const packet = Buffer.from(data);
    this.parse_refreshx(packet);

    this.players = this.players.filter((player) => !!player.name);
    console.log(this.players);
  },
  parse_refreshx(data) {
    let pos = 0;
    let buffer;

    // Getting players name
    for (let i = 0; i < MAX_PLAYERS; i++) {
      buffer = data.slice(pos, pos + NAME_MAX_LENGTH + 1);
      let length = buffer[0];
      let name = buffer.slice(1, 1 + length).toString();

      pos += NAME_MAX_LENGTH;
      this.players.push({name: name});
    }

    pos =  MAX_PLAYERS * (NAME_MAX_LENGTH + 1) + 1;

    // Getting players hwid
    for (let i = 0; i < MAX_PLAYERS; i++) {
      buffer = data.slice(pos, pos + HWID_LENGTH + 1);
      let hwid = buffer.toString();

      pos += HWID_LENGTH;
      this.players[i].hwid = hwid;
    }

    // Getting players team
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.players[i].team = data[pos++];
    }

    // Getting players kills
    for (let i = 0; i < MAX_PLAYERS; i++, pos+=2) {
      buffer = data.slice(pos, pos + KILLS_DEATH_LENGTH + 1);
      this.players[i].kills = buffer.readUInt16LE();
    }

    // Getting players caps
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.players[i].caps = data[pos++];
    }

    // Getting players deaths
    for (let i = 0; i < MAX_PLAYERS; i++, pos+=2) {
      buffer = data.slice(pos, pos + KILLS_DEATH_LENGTH + 1);
      this.players[i].deaths = buffer.readUInt16LE();
    }

    // Getting players pings
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.players[i].ping = data[pos++];
    }

    // Getting players ids
    for (let i = 0; i < MAX_PLAYERS; i++) {
      this.players[i].id = data[pos++];
    }
  }
}
