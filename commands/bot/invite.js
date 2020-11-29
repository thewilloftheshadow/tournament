module.exports.run = async (client, message, args) => {
  const re = message.re

  message.channel.send(`<https://discord.com/api/oauth2/authorize?client_id=${re.client.user.id}&permissions=2147483647&scope=bot>`)
};

module.exports.help = {
  name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description:`Get a link to invite the bot!`,
  syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias:[],
  module:`${__dirname.split(`/`).pop()}`,
  access: {level: 0}
}
