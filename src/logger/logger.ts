import pino from 'pino';
import {env} from "../config/env.zod";

export const baseLogger = pino({
    level: env.LOG_LEVEL ?? 'info',

    timestamp: pino.stdTimeFunctions.isoTime,

    transport:
        env.NODE_ENV === 'dev'
            ? {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'HH:MM:ss',
                    ignore: 'pid,hostname'
                }
            }
            : undefined
});