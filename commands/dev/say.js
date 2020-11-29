module.exports.run = async (client, message, args) => {
  const re = message.re

  message.delete()
  let msg = args.join(" ")
  if(msg === "") return;
  let channel = message.channel
  channel = message.mentions.channels.first() || await client.channels.cache.get(args[0]) || message.channel
  if(channel.id != message.channel.id) msg = args.slice(1).join(" ")
  channel.send(msg, {disableMentions: "all"})
  re.client.emit("botlog", new re.Discord.MessageEmbed().setTitle(`Say command used by ${message.author.tag}`).setDescription(`Message sent by <@${message.author.id}> in ${message.channel}:\n\`\`\`fix\n${msg}\n\`\`\``))
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Says a message as the bot",
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <message>`,
  alias: ["copy"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 5}
}
