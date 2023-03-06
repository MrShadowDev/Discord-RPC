const rpc = require('discordrpcgenerator');
const client = require('..');
const config = require('../config');
const console = require('../utils/logger');

client.on("ready", async () => {
  console.logger.info(`Logged in as ${client.user.tag}!`);

  if (!config.spotify.clientID) return console.exit("No Spotify client ID specified.");
  if (!config.spotify.accessToken) return console.exit("No Spotify access token specified.");

  const presence = rpc.createSpotifyRpc(client, config.spotify.clientID, config.spotify.accessToken)
    .setType("LISTENING");

  if (config.spotify.name) presence.setName(config.spotify.name);
  if (config.spotify.state) presence.setState(config.spotify.state);
  if (config.spotify.details) presence.setDetails(config.spotify.details);

  if (config.spotify.largeImageKey && config.spotify.largeImageText) {
    presence.setAssetsLargeImage(config.spotify.largeImageKey);
    presence.setAssetsLargeText(config.spotify.largeImageText);
  }

  if (config.spotify.smallImageKey && config.spotify.smallImageText) {
    presence.setAssetsSmallImage(config.spotify.smallImageKey);
    presence.setAssetsSmallText(config.spotify.smallImageText);
  }

  if (config.spotify.startTimestamp) presence.setStartTimestamp(Date.now());
  if (config.spotify.endTimestamp) presence.setEndTimestamp(Date.now());

  client.user.setPresence(presence.toDiscord());
  if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
    client.user.setStatus(config.status);
  }

  console.logger.info('Spotify RPC enabled!');
  console.logger.info('Spotify: ' + config.spotify.details);
  console.logger.info(`Status: ${!config.status ? 'default' : config.status}`);
});
