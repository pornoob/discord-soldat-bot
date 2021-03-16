import Discord from "discord.js";
import { evaluate } from "mathjs"

export default {
  name: ["calc"],
  context: {},
  execute(message, args) {
    if (!args.length) return;
    try {
      const result = evaluate(args.join(''));
      message.channel.send(`\`result: ${result}\``);
    } catch (e) {
      message.channel.send(`Unsupported operation`);
    }
  }
}
