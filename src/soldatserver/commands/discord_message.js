export default {
  triggers: ["!msg", "!message"],
  context: {},
  execute(nickname, args) {
    console.log(`Emitting message to discord\r\n`);
    this.context.client.emit("discord_message", nickname, args.join(" "));
  }
}
