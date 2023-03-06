const rpc = require('discordrpcgenerator');
const client = require('..');
const config = require('../config');
const console = require('../utils/logger');
const discord = require('../utils/discord');

client.on("ready", async () => {
  console.logger.info(`Logged in as ${client.user.tag}!`);

  if (!config.twitch.applicationID) {
    return console.exit("No application ID specified");
  }

  if (!config.twitch.url) {
    console.logger.warn("No Twitch channel specified");
  }

  const presence = rpc.createTwitchRpc(client)
    .setApplicationId(config.twitch.applicationID)
    .setType("STREAMING")
    .setName("rpc");

  if (config.twitch.url) {
    presence.setUrl(config.twitch.url);
  }

  try {
    const [largeImage, smallImage] = await Promise.all([
      discord.getImage(config.twitch.applicationID, config.twitch.largeImageKey),
      discord.getImage(config.twitch.applicationID, config.twitch.smallImageKey)
    ]);

    if (config.twitch.state) {
      presence.setState(config.twitch.state);
    }

    if (config.twitch.details) {
      presence.setDetails(config.twitch.details);
    }

    if (largeImage) {
      presence.setAssetsLargeImage(largeImage.id);
      presence.setAssetsLargeText(config.twitch.largeImageText || largeImage.name);
    }

    if (smallImage) {
      presence.setAssetsSmallImage(smallImage.id);
      presence.setAssetsSmallText(config.twitch.smallImageText || smallImage.name);
    }

    if (config.twitch.startTimestamp) {
      presence.setStartTimestamp(config.twitch.startTimestamp);
    }

    if (config.twitch.endTimestamp) {
      presence.setEndTimestamp(config.twitch.endTimestamp);
    }

    client.user.setPresence(presence.toDiscord());

    if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
      client.user.setStatus(config.status);
    }

    console.logger.info('Twitch RPC enabled!');
    console.logger.info('Twitch: ' + config.twitch.state);
    console.logger.info(`Status: ${!config.status ? 'default' : config.status}`);
  } catch (error) {
    console.logger.error(`Error setting Twitch presence: ${error}`);
  }
});
