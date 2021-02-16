import appRoot from 'app-root-path';
import { createLogger, format, transports, config } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json } = format;

const options = {
  file: {
    filename: `${appRoot}/src/logs/application-%DATE%.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'user-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  exceptionHandlers: [
    new transports.Console(options.console),
    new transports.DailyRotateFile({
      filename: `${appRoot}/src/logs/errors-%DATE%.log`
    })
  ],
  transports: [
    new transports.DailyRotateFile(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

class LogStream {
  write(text: string) {
    logger.info(text);
  }
}

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export { LogStream };

export default logger;
