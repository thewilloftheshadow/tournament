module.exports = async function(message, re) {
  message.re = re
  if (!message.guild) return
  if (message.author && message.author.bot) return;
  let prefix = re.config.prefix
  message.prefix = prefix
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return;
  if (re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  console.log(`${re.moment().format('MMMM Do YYYY, h:mm:ss a')} | ${message.author.tag} - ${message.content}`)
  message.author.botperms = await re.func.botperms(message.author.id, message)
  message.member.botperms = message.author.botperms

  let tagarray = message.content.toLowerCase().split("--")
  tagarray.shift()
  tags = {}
  tagarray.forEach(x => {
      ta = x.split(" ")
      if (ta[1] === "true") ta[1] = true
      if (ta[1] === "false") ta[1] = false
      tags[ta[0]] = ta[1]
  })
  // console.log(`                        - ${JSON.stringify(tags, null, 2)}`)
  message.tags = tags
  
  let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ /);
  let command = args.shift().toLowerCase();
  if (command == "secretphrasetousefordmmessages" && message.guild) command = "WOOOOOOOT"
  if (command === "args") {
      return message.channel.send(`["${args.join(`", "`)}"]`, { code: "xl" })
  }
  if (command === "tags") {
      return message.channel.send(JSON.stringify(tags, null, 2), { code: "xl" })
  }
  let commandfile = re.client.commands.get(command);
  if (!commandfile) return

  let cmdaccess = commandfile.help.access
  if (cmdaccess.level > message.member.botperms.level) {
      return message.channel.send(
          `Sorry! This command requires Level ${cmdaccess.level} permissions, but you only have Level ${message.member.botperms.level} permissions.`
      );
  }

  try {
      await commandfile.run(re.client, message, args)
  } catch (err) {
      let embed = new re.Discord.MessageEmbed()
          .setDescription(
              `An error occured when ${
              message.author
              } (${message.author.id}) attempted the following command: \`${message.content.replace(
                  /(`)/g,
                  "$1"
              )}\``
          )
          .addField(
              "Error Description",
              `\`\`\`${err.stack.replace(
                  /(?:(?!\n.*?\(\/app.*?)\n.*?\(\/.*?\))+/g,
                  "\n\t..."
              )}\`\`\``
          ).setColor("RED")
          .setFooter("Server ID: " + message.guild.id)
      await message.channel.send(
          `An error occurred when trying to execute this command. The developers have been notified.`
      )
      //re.client.channels.cache.get(re.config.errors).send(embed)
      console.error(err)
  }
  return message;
}