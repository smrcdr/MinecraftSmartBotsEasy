import {createBot} from "mineflayer";
import type {Bot} from "mineflayer";
import {createLogger} from "../logger/create-logger";
import {SmartBot} from "../modules/bot-context/bot-context";

const bot = new SmartBot({
    username: "Bot",
    version: "1.21.4",
    server: "localhost",
    port: 6666
})
bot.session.start()