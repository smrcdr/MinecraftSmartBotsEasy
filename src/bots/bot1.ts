import {createBot} from "mineflayer";
import type {Bot} from "mineflayer";
import {createLogger} from "../logger/create-logger";

const logger = createLogger({
    context: "Тестировка бота"
})
logger.info("Бот создался")

const bot :Bot = createBot({
    username: "Bot",
    version: "1.21.4",
    host: "localhost",
    port: 6666
})
logger.info("Бот создался")

bot.on("spawn", () => {
    logger.info("Бот заспавнился(вроде xD)")
    bot.chat("hello world")
})