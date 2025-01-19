import { Logger, createLogger, format, transports } from "winston";

export class Log {
    static logger: Logger;

    static init(): void {
        this.logger = createLogger({
            level: "debug",
            format: format.json(),
            transports: [new transports.Console()],
        });
    }

    static info(message: LoggerInfo) {
        const _message = message.message;
        delete (message as any).message;
        this.logger.info(_message, message);
    }

    static error(error: LoggerError): void {
        const _error = error.error;
        delete (error as any).error;
        this.logger.error({
            message: _error.message,
            stack: _error.stack,
            clientIp: error.clientIp,
            reqUrl: error.reqUrl,
            userId: error.userId,
            others: error.others,
        });
    }
}

interface LoggerInfo {
    message: string;
    [key: string]: any;
}

interface LoggerError {
    error: Error;
    [key: string]: any;
}
