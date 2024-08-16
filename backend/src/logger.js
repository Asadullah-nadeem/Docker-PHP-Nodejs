const winston = require('winston');
const { format, createLogger, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const fileTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', 
  level: 'info'
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({ format: logFormat }),    fileTransport
  ]
});

module.exports = logger;
