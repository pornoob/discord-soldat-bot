import EventEmitter from "events";

export default {
  emitter: new EventEmitter(),
  parse(data) {
    let result = this.process(data);
  },

  process(data) {
    const message = this.player_message(data);
    if (!message) this.server_message(data);
    else {
      console.log({player_message: message});
      if (!message.message.startsWith("!")) return;

      const args = message.message.split(' ');
      const command = args.shift().toLowerCase();

      this.emitter.emit("player_command", message.nickname, command, args);
    }
  },

  player_message(data) {
    if (!data.startsWith('[')) return;
    let nickname = "";
    let count = 0;
    let i;

    for (i = 0; i < data.length; i++) {
      if (data[i] === "[") count++;
      else if (data[i] === "]") count--;

      if (count === 0) break;
      if (i) nickname += data[i];
    }
    return {nickname: nickname, message: data.slice(i+2, -2)}; // removing \r\n
  },

  server_message(data) {
    this.emitter.emit("server_message", data);
  },

  on(event_name, callback) {
    this.emitter.on(event_name, callback);
  }
}
