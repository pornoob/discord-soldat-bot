export default {
  parse(command, args, context) {
    switch (command) {
      case "ping": 
        const elapsed_time = Date.now() - context.createdTimestamp;
        context.reply(`pong! ${elapsed_time}ms`);
        break;
    }
  }
}
