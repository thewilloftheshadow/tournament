module.exports.run = async (client, message, args) => {
  const re = message.re

  message.channel.send("https://discord.gg/Hr62m5X")
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Get a link to the bot's support server`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0}
}
