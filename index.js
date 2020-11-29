require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
module.exports = {client}

const config = require("./config.js")
const db = require("quick.db")

client.once("ready", () => {
  console.log(
    `${client.user.username} is online in ${client.guilds.cache.size} guilds`
  )
  client.user.setPresence({
    activity: { name: 'with Shadow in pinball', type: "COMPETING"},
    status: "idle",
  })
  client.guilds.cache.forEach((x) =>
    console.log(`  -${x.name} - ${x.id} (${x.members.cache.size} members)`)
  )
})

client.on("messageUpdate", (oldmsg, newmsg) => {
  newmsg.thisisedit = true
  if (oldmsg.content != newmsg.content) client.emit("message", newmsg)
})

client.on("message", async (message) => {
  if (message.author.bot) return
  if (message.content.indexOf(config.prefix) !== 0) return
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command === "ping") {
    let m = await message.channel.send("Pinging...")
    let botLatency = Math.abs(m.createdTimestamp - message.createdTimestamp),
      ping = client.ws.ping,
      memory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)

    let embed = new Discord.MessageEmbed()
      .setTitle(`Pong!`)
      .setThumbnail(
        message.guild.logoURL({ format: "png", dynamic: true, size: 1024 })
      )
      .addField("Bot Latency", `${botLatency}ms`, true)
      .addField("Ping", `${Math.round(ping)}ms`, true)
      .setTimestamp()

    m.delete()
    await message.channel.send(embed)
  }

  

  if (command == "eval" && !config.eval.includes(message.author.id)) {
    try {
      const code = args.join(" ")
      let evaled = eval(code)

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled)

      if (message.content.endsWith(";1+1;")) message.delete()

      if (!message.content.endsWith(";1+1;"))
        message.channel.send(clean(evaled), { code: "js" })
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
  
  if (command == "setign") {
    let validchar = ["Q", "W", "E", "R", "T", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "_"]
    if (!args[0]) return message.channel.send("Yeah sure. Don't try make me look stupid, even I know you're not setting anything!")
    if (message.author.username != "Ashish" && (args[0].length > 14 || args[0].length < 3)) return message.channel.send("I know that you need at least 3 characters and not more than 14 character to set your in game name. Only Ashish can set it more.")
    if (!args[0].includes(validchar) || /\s/.test(args[0])) return message.channel.send("There is an invalid character!")
    db.set(`setign_${message.author.id}`, args[0])
  }
})

const clean = function (text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
  else return text
}

client.login(process.env.TOKEN)
