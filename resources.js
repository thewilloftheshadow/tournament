const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"] })
const db = require("quick.db")

const config = require("./config.js")
const vars = require("./vars.js")
const fn = require("./fn.js")

const prefix = config.prefix

exports.data = {
  vars: vars,
  fn: fn,
  func: fn,
  prefix: prefix,
  db: db,
  client: client,
  Discord: Discord,
  config: config,
  moment: require("moment")
}

exports.data.list = Object.getOwnPropertyNames(exports.data)