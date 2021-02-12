import GameMode from './includes/gamemodes.js';

export default {
  triggers: ["!gm", "!gamemode"],
  context: {},
  execute(nickname, args) {

    if (!args.length) return;
    this.context.client.write(`/gamemode ${GameMode[args[0].toUpperCase()]}\r\n`);
  }
}
