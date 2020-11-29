const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  const re = message.re

  if(!args[0]) return message.channel.send("You must specify a user to unban")
  let user = re.func.getuser(args[0], message)
  if(user.id === re.config.ownerID || re.config.developers.includes(user.id)) return message.channel.send("You can't unbotban a developer! Its pointless anyway lmao they can't be botbanned in the first place")
  let botban = await re.db.botban.findOne({user: user.id})
  if(!botban) return message.channel.send("That user isn't botbanned")
  await re.dbs.botban.findOneAndDelete(user.id)
  message.channel.send("Done! <@" + user + "> has been unbanned from the Andromeda System")
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Unban someone from the bot`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["ubban"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4, mm: null}
}
