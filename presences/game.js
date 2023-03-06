const rpc = require('discordrpcgenerator');
const client = require('..');
const config = require('../config');
const logger = require('../utils/logger');
const discord = require('../utils/discord');

client.on('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  if (!config.game.applicationID || !config.game.name) {
    logger.exit('Application ID or name not specified');
  }

  const presence = new rpc.Rpc()
    .setName(config.game.name)
    .setType('PLAYING')
    .setApplicationId(config.game.applicationID);

  const [largeImage, smallImage] = await Promise.all([
    discord.getImage(config.game.applicationID, config.game.largeImageKey),
    discord.getImage(config.game.applicationID, config.game.smallImageKey),
  ]);

  if (config.game.state) {
    presence.setState(config.game.state);
  }
  if (config.game.details) {
    presence.setDetails(config.game.details);
  }
  if (largeImage && largeImage.id) {
    presence.setAssetsLargeImage(largeImage.id);
    if (config.game.largeImageText || largeImage.name) {
      presence.setAssetsLargeText(config.game.largeImageText || largeImage.name);
    }
  }
  if (smallImage && smallImage.id) {
    presence.setAssetsSmallImage(smallImage.id);
    if (config.game.smallImageText || smallImage.name) {
      presence.setAssetsSmallText(config.game.smallImageText || smallImage.name);
    }
  }
  if (config.game.startTimestamp) {
    presence.setStartTimestamp(config.game.startTimestamp);
  }
  if (config.game.endTimestamp) {
    presence.setEndTimestamp(config.game.endTimestamp);
  }

  client.user.setPresence(presence.toDiscord());

  if (config.status && ['online', 'idle', 'dnd'].includes(config.status)) {
    client.user.setStatus(config.status);
  }

  logger.logger.info('Game RPC enabled!');
  logger.logger.info(`Game: ${config.game.name}`);
  logger.logger.info(`Status: ${config.status || 'default'}`);
});
