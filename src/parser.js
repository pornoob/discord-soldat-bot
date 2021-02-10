import EventEmitter from "events";

export default {
  command_prefix: "!",
  channels: ["general"],
  emitter: new EventEmitter(),

  parse(message) {
    // ignoring if it is not a command
    if (!message.channel.name in this.channels) return;
    if (!message.content.startsWith(this.command_prefix)) return;

    const content = message.content.slice(this.command_prefix.length);
    const args = content.split(" ");
    const command = args.shift().toLowerCase();
    this.emitter.emit("command", command, args, message);
  },

  on(event, callback) {
    this.emitter.on(event, callback);
  }
}
