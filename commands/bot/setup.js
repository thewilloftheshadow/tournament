module.exports.run = async (client, message, args) => {
  const re = message.re
  return message.channel.send("Setup is currently being rewritten, ask TheShadow#8124 to setup your server manually!")
}

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Setup your server`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user>`,
    alias:["settings", "set"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 3}
}