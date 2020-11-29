module.exports.run = async (client, message, args) => {
  const re = message.re

  let user = re.func.getuser(args.join(" "), message)
  if (!user) return message.channel.send("User not found")
  let bp = await re.func.botperms(user.id, message)
  // message.channel.send(JSON.stringify(re.func.botperms(user.id, message), null, 4), {"code": "fix"})
  let embed = new re.Discord.MessageEmbed()
      .setTitle(user.user.tag + "'s bot permissions")
      .setDescription(`Permission Level: ${bp.level} - ${user.user.bot ? "Bot" : re.vars.botperms[bp.level]}`)
  if(bp.mm && bp.mm.length > 0) embed.description += `\nModule Permissions: ${bp.mm.length > 0 ? `\`${bp.mm.join("`, `")}\`` : "None"}`
  if(bp.eval) embed.description += `\nEval: ${bp.eval}`
  let botban = await re.db.botban.findOne({ server: message.guild.id }).exec()
  if(botban){embed.addField(`Botbanned:`,  `Yes. Reason: \`${botban.reason}\`\nAdmin: \`${re.client.users.fetch(botban.admin).user.username}\``)}
  message.channel.send(embed)
}

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Check botperms`,
    syntax:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user>`,
    alias:["botperms", "usercheck", "uc"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0}
}