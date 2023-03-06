const chalk = require('chalk');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => {
      const { level, message, timestamp } = info;
      const time = chalk.magenta(timestamp) + ' ';
      const logColors = { debug: 'blue', error: 'red', info: 'greenBright', warn: 'yellow' };
      return time + (logColors[level] ? chalk[logColors[level]](`[${level.toUpperCase()}]`) : `[${level.toUpperCase()}]`) + ` ${message}`;
    })
  ),
  level: 'info'
});

const log = console.log;

const exit = (text) => {
  logger.error(`${text}. Exiting...`);
  process.exit();
};

module.exports = {
  logger,
  log,
  exit
};
