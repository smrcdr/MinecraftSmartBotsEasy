// src/shared/logger/create-logger.ts
import { baseLogger } from './logger';

type LoggerContext = {
    context: string;
    botId?: string;
    username?: string;
    module?: string;
};

export function createLogger(context: LoggerContext) {
    return baseLogger.child(context);
}