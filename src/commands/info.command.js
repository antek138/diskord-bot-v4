const { RichEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Display bot info.",
  aliases: ["botinfo"],

  run(msg, args) {
    const { channel } = msg

    const botAuthor = "Антони"
    const botVersion = "v1.2"
    const botName = "GutenBoten"
    const botDescription =
      "Bot, który ci we wszystkim pomoże."

    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle(botName)
      // Set the color of the embed
      .setColor(0xb348ff)
      // Set the main content of the embed
      .setDescription(botDescription)
      .addField("Autor", botAuthor, true)
      .addField("Wersja", botVersion, true)

    channel.send(embed)
  },
}
