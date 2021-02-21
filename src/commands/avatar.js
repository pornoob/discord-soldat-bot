import Discord from "discord.js";

export default {
  name: ["av", "avatar"],
  context: {},
  execute(message, args) {
    if (!message.mentions.users.size) {
      message.reply("You should tag to someone");
      return;
    }
    message.mentions.users.map(user => {
      const avatar = new Discord.MessageEmbed();
      avatar.setColor("#f4000e");
      avatar.setTitle(`${user.username}'s avatar`);
      avatar.setImage(user.displayAvatarURL({ format: "png", dynamic: true }));
      message.channel.send(avatar);
    });
  }
}
