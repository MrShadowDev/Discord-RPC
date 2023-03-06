const discord = require('freeze-selfbot');
const client = new discord.Client();
const config = require("./config");
const express = require('express');
const logger = require("./utils/logger");
const app = express();

// Exit if no token is provided
if (!process.env.TOKEN) {
  logger.exit("No token provided");
}

client.login(process.env.TOKEN);

// Load presence based on config mode
if (config.mode) {
  require(`./presences/${config.mode}`);
} else {
  logger.exit('No presence selected!');
}

logger.info(`
  ██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗       ██████╗ ██████╗  ██████╗
  ██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗      ██╔══██╗██╔══██╗██╔════╝
  ██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║█████╗██████╔╝██████╔╝██║     
  ██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║╚════╝██╔══██╗██╔═══╝ ██║     
  ██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝      ██║  ██║██║     ╚██████╗
  ╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝       ╚═╝  ╚═╝╚═╝      ╚═════╝                                                                                
`);

app.get('/', (_, res) => {
  res.send('Presence is ready!');
});

const server = app.listen(3000, () => {
  logger.info(`Server listening on port ${server.address().port}`);
});
