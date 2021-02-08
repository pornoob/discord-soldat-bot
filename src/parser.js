import processors from "./processors/main.js";

export default {
  command_prefix: "!",
  channels: ["general"],

  parse(message) {
    // ignoring if it is not a command
    if (!message.channel.name in this.channels) return;
    if (!message.content.startsWith(this.command_prefix)) return;

    const content = message.content.slice(this.command_prefix.length);
    const args = content.split(" ");
    const command = args.shift().toLowerCase();
    this.process(command, args, message);
  },

  process(command, args, context) {
    processors.map((processor) => { processor.parse(command, args, context) })
  }
}
