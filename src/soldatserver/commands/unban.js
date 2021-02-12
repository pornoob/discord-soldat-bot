export default {
  triggers: ["!ub", "!unban"],
  context: {},
  execute(nickname, args) {
    this.context.client.write(`/UNBANLAST\r\n`);
    this.context.client.write(`/SAY ${this.context.bot_nick}: UNBANLAST applied\r\n`);
  }
}
