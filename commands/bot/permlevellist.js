module.exports.run = async (client, message, args) => {
  const re = message.re

  let embed = new re.Discord.MessageEmbed()
  .setTitle("List of all permission levels:")
  .addField("Level 0", re.vars.botperms["0"])
  .addField("Level 1", re.vars.botperms["1"])
  .addField("Level 2", re.vars.botperms["2"])
  .addField("Level 3", re.vars.botperms["3"])
  .addField("Level 4", re.vars.botperms["4"])
  .addField("Level 5", re.vars.botperms["5"])
  .addField("Level 6", re.vars.botperms["6"])
  message.channel.send(embed)
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `List the perm levels`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["pll"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0}
}
