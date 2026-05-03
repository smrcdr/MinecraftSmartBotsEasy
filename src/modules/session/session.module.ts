import type {BotConfig} from "./domain/bot-config.zod";
import type {Bot} from "mineflayer";
import {createBot} from "mineflayer";
import {BotState} from "./domain/bot-state.enum";
import type {Logger} from "pino";
import {createLogger} from "../../logger/create-logger";
import {sleep} from "../../shared/utils";

export class SessionModule {

    public readonly botConfig: BotConfig
    private _rawBot: Bot | null = null
    private _botState: BotState = BotState.OFFLINE
    private logger: Logger

    constructor(botConfig: BotConfig) {
        this.botConfig = botConfig
        this.logger = createLogger({
            context: "bot",
            module: "session",
            username: botConfig.username
        })
    }

    get rawBot(): Bot {
        if (!this._rawBot) {
            throw new Error("Бот не запущен")
        }
        return this._rawBot
    }

    get state(): BotState {
        return this._botState
    }

    set state(newState: BotState) {
        if(!Object.values(BotState).includes(newState)) throw new Error("Неверно передан state!")
        this._botState = newState
        this.logger.info({
            msg: "state бота изменен",
            newState: newState
        })
    }

    async start() {
        this.logger.info("Начался запус бота...")
        const bot = createBot(this.botConfig)
        this.state = BotState.CONNECT
        this._rawBot = bot
        this.addBasicEvent()
    }

    async stop() {
        this.logger.info("Происходит выключение бота...")
        this.rawBot.removeAllListeners()
        this.rawBot._client.removeAllListeners()
        this.rawBot._client.socket.destroy()
        this.logger.info("Бот выключен")
    }

    async restart(ms :number = 30000) {
        await this.stop()
        await sleep(ms)
        await this.start()
    }


    private addBasicEvent() {
        this.rawBot.on("error", (err) => {
            this.state = BotState.OFFLINE
            this.logger.error({
                message: "Произошла ошибка во время работы бота",
                error: err.message
            })
        })
        this.rawBot.on("end", (reason) => {
            this.state = BotState.OFFLINE
            this.logger.info({
                message: "Бот откючен",
                error: reason
            })
        })
        this.rawBot.on("kicked", reason => {
            this.state = BotState.OFFLINE
            this.logger.warn({
                message: "Бот кикнут",
                error: reason
            })
        })
        this.rawBot.once("spawn", () => {
            this.state = BotState.WAIT
            this.logger.info({
                msg: "Бот заспавнился",
            })
        })
    }
}