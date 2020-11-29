module.exports = {
  jsm: async function(message, text) {
    message.channel.send(text, {code: "js", "split": " "})
  },
  botperms: async function (userid, message) {
    if (userid instanceof message.re.Discord.GuildMember) userid = userid.id;
    if (userid instanceof message.re.Discord.User) userid = userid.id;
    let perms = {
      level: 0,
      mm: [],
      eval: false,
      bot: false,
    };
    let permmem = message.guild
      ? message.guild.members.cache.get(userid)
      : message.client.users.cache.get(userid);
    let scon = await message.re.db.config
      .findOne({ server: message.guild.id })
      .exec();
    if (message.guild) {
      // let staffroles = scon.staff || []
      // let modroles = scon.mod || []
      // let adminroles = scon.admin || []
      // let mmeconomy = scon.economy || []
      // let mmfactions = scon.factions || []
      // if (staffroles)
      //   staffroles.forEach((x) => {
      //     if (permmem.roles.cache.has(x)) perms.level = 1;
      //   });
      // if (modroles)
      //   modroles.forEach((x) => {
      //     if (permmem.roles.cache.has(x)) perms.level = 2;
      //   });
      // if (adminroles)
      //   adminroles.forEach((x) => {
      //     if (permmem.roles.cache.has(x)) perms.level = 3;
      //   });
      // if (mmeconomy)
      //   mmeconomy.forEach((x) => {
      //     if (permmem.roles.cache.has(x)) perms.mm.push("economy");
      //   });
      // if (mmfactions)
      //   mmfactions.forEach((x) => {
      //     if (permmem.roles.cache.has(x)) perms.mm.push("factions");
      //   });
      if (permmem.hasPermission("MANAGE_MESSAGES"))
        perms.level = 2;
      if (permmem.hasPermission("MANAGE_GUILD"))
        perms.level = 3;
    }
    // if (
    //   message.client.guilds.cache
    //     .get(message.re.config.server)
    //     .members.cache.get(userid) &&
    //   message.client.guilds.cache
    //     .get(message.re.config.server)
    //     .members.cache.get(userid)
    //     .roles.cache.has(message.re.config.barole)
    // )
    //   perms.level = 4;
    // if (
    //   message.client.guilds.cache
    //     .get(message.re.config.server)
    //     .members.cache.get(userid) &&
    //   message.client.guilds.cache
    //     .get(message.re.config.server)
    //     .members.cache.get(userid)
    //     .roles.cache.has(message.re.config.devrole)
    // )
    //   perms.level = 5;
    if (re.config.eval.includes(message.re.config.ownerID)) {
      perms.level = 6;
      perms.eval = true;
    }
    if (re.config.eval.includes(message.author.id))
      perms.eval = true;
    if (permmem.user.bot)
      perms = {
        level: 0,
        modules: [],
        eval: false,
        bot: true,
      };
    return perms;
  },
  sleep: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  prettyNumber: function (number) {
    if (!typeof number === "string") number = number.toString();
    number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  capitalizeFirstLetter: function (string) {
    if (typeof string == undefined) return;
    if(!string) return;
    var firstLetter = string[0] || string.charAt(0);
    return firstLetter ? string.replace(/^./, firstLetter.toUpperCase()) : "";
  },
  clean: function (text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  },
  formatClean: function (text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "")
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  },
  getRandom: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  capFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getMemoryUsage: function () {
    let total_rss = require("fs")
      .readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8")
      .split("\n")
      .filter((l) => l.startsWith("total_rss"))[0]
      .split(" ")[1];
    return (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
  },
  getuser: function (input, message) {
    if (!input) return message.member;
    let target = message.mentions.members.first();
    if (target == null) {
      target = message.guild.members.cache.find(
        (member) =>
          member.user.tag === input ||
          member.user.id === input ||
          member.user.username === input ||
          (member.nickname !== null && member.nickname === input)
      );
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        (member) =>
          member.user.username.toLowerCase() +
            "#" +
            member.user.discriminator ===
            input.toLowerCase() ||
          member.user.username.toLowerCase() === input.toLowerCase() ||
          (member.nickname !== null &&
            member.nickname.toLowerCase() === input.toLowerCase())
      );
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        (member) =>
          member.user.username.startsWith(input) ||
          member.user.username.toLowerCase().startsWith(input.toLowerCase())
      );
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        (member) =>
          (member.nickname !== null && member.nickname.startsWith(input)) ||
          (member.nickname !== null &&
            member.nickname.toLowerCase().startsWith(input.toLowerCase()))
      );
    }
    if (target == null) {
      target = message.guild.members.cache.find(
        (member) =>
          member.user.username.toLowerCase().includes(input.toLowerCase()) ||
          (member.nickname !== null &&
            member.nickname.toLowerCase().includes(input.toLowerCase()))
      );
    }
    return target;
  },
  paginator: async (author, msg, embeds, pageNow, addReactions = true) => {
    if (embeds.length === 1) return;
    if (addReactions) {
      await msg.react("⏪");
      await msg.react("◀");
      await msg.react("▶");
      await msg.react("⏩");
    }
    let reaction = await msg
      .awaitReactions(
        (reaction, user) =>
          user.id == author &&
          ["◀", "▶", "⏪", "⏩"].includes(reaction.emoji.name),
        { time: 30 * 1000, max: 1, errors: ["time"] }
      )
      .catch(() => {});
    if (!reaction) return msg.reactions.removeAll().catch(() => {});
    reaction = reaction.first();
    //console.log(msg.member.users.tag)
    if (
      msg.channel.type == "dm" ||
      !msg.guild.me.hasPermission("MANAGE_MESSAGES")
    ) {
      if (reaction.emoji.name == "◀") {
        let m = await msg.channel.send(embeds[Math.max(pageNow - 1, 0)]);
        msg.delete();
        module.exports.paginator(author, m, embeds, Math.max(pageNow - 1, 0));
      } else if (reaction.emoji.name == "▶") {
        let m = await msg.channel.send(
          embeds[Math.min(pageNow + 1, embeds.length - 1)]
        );
        msg.delete();
        module.exports.paginator(
          author,
          m,
          embeds,
          Math.min(pageNow + 1, embeds.length - 1)
        );
      } else if (reaction.emoji.name == "⏪") {
        let m = await msg.channel.send(embeds[0]);
        msg.delete();
        module.exports.paginator(author, m, embeds, 0);
      } else if (reaction.emoji.name == "⏩") {
        let m = await msg.channel.send(embeds[embeds.length - 1]);
        msg.delete();
        module.exports.paginator(author, m, embeds, embeds.length - 1);
      }
    } else {
      if (reaction.emoji.name == "◀") {
        await reaction.users.remove(author);
        let m = await msg.edit(embeds[Math.max(pageNow - 1, 0)]);
        module.exports.paginator(author, m, embeds, Math.max(pageNow - 1, 0), false);
      } else if (reaction.emoji.name == "▶") {
        await reaction.users.remove(author);
        let m = await msg.edit(
          embeds[Math.min(pageNow + 1, embeds.length - 1)]
        );
        module.exports.paginator(
          author,
          m,
          embeds,
          Math.min(pageNow + 1, embeds.length - 1),
          false
        );
      } else if (reaction.emoji.name == "⏪") {
        await reaction.users.remove(author);
        let m = await msg.edit(embeds[0]);
        module.exports.paginator(author, m, embeds, 0, false);
      } else if (reaction.emoji.name == "⏩") {
        await reaction.users.remove(author);
        let m = await msg.edit(embeds[embeds.length - 1]);
        module.exports.paginator(author, m, embeds, embeds.length - 1, false);
      }
    }
  },
  randomString: function (len) {
    let buf = [],
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[func.getRandom(0, charlen - 1)]);
    }

    return buf.join("");
  },
  getEmoji: function (name) {
    return client.emojis.cache.find(
      (emoji) =>
        emoji.name.toLowerCase() == name.toLowerCase().replace(/ /g, "_")
    );
  },
  twoid: function () {
    return `${require("nanoid").nanoid(8)}${require("nanoid").nanoid(8)}`;
  },
};
