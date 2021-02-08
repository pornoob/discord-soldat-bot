import config from '../config.js';

export default {
  parse(command, args, context) {
    if (command !== "soldat") return;
    let action = args.shift().toLowerCase();
    this.process(action, args, context);
  },

  process(command, args, context) {
    if (command === "server") {
      context.channel.send(`soldat://${config.soldatserver.ip}:${config.soldatserver.port}/${config.soldatserver.password}`);
    }
  }
};
