import fs from "fs"

const files = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith(".js"));
let commands = [];

for (const file of files) {
  const command = require(`${__dirname}/commands/${file}`);
  commands.push({
    ...command.default,
    name: file.substring(0, file.lastIndexOf('.'))
  });
}

export default commands;
