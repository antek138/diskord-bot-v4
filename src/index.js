const { Client } = require("discord.js")
const chalk = require("chalk")

const { token } = require("./config/config.js")

const client = new Client()

const commandHandler = require("./handlers/command.handler")
const settingsHandler = require("./handlers/settings.handler")

const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;

 
const log = console.log

// Initialize Comamnd Manager
commandHandler(client)
// Initialize Settings Manager
settingsHandler(client)

client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`))

  // Initialize interval for each guild
  client.settings.forEach((config, guildId) => {
    const { guilds } = client
    // Check if guild exist
    if (guilds.has(guildId)) {
      const guild = guilds.get(guildId)
      // Check if available
      if (guild.available) {
        // console.log("available")

        // Set Interval for each channel
        const clockChannels = config.clocks
        setInterval(() => {
          const time = new Date().toLocaleTimeString().slice(0, 5)
          const channelName = `🕥 ${time}`

          clockChannels.forEach((channelId, index) => {
            // Check if channel exists
            if (guild.channels.has(channelId)) {
              // log("channel exist")
              const channelToUpdate = guild.channels.get(channelId)
              channelToUpdate.setName(channelName)
            } else {
              // log("not exist")
              // Remove Id from config
              // that does not exist
              clockChannels.splice(index, 1)
              client.saveConfig(guildId)
            }
          })
        }, 60 * 1000)
      }
    }
  })
})

// Connect with Discord
client.login(token)

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
