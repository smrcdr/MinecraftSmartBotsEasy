import type {BotConfig} from "../session/domain/bot-config.zod";
import {SessionModule} from "../session/session.module";

export class SmartBot {

    public readonly session :SessionModule

    constructor(botConfig :BotConfig) {
        this.session = new SessionModule(botConfig)
    }

}