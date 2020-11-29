const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  const re = message.re
  message.react("✅")
  client.user.setStatus('offline')
  cmd.run(`pm2 restart ${process.env.pm_id}`)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Reboot the bot`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["reboot"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4, mm: null}
}