export default {
  triggers: ["!sp", "!pw", "!password"],
  context: {},
  execute(nickname, args) {
    let min = 1000;
    let max = 10000;
    let random = parseInt(Math.random() * (max - min) + min);
    this.context.client.write(`/SAY ${this.context.bot_nick}: Setting password to ${random}\r\n`);
    this.context.client.write(`/PASSWORD ${random}\r\n`);
    this.context.config.password = random;
  }
}
