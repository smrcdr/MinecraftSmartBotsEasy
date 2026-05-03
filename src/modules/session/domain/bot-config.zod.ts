import {z} from "zod";

export const BotConfigSchema = z
    .object({
        version: z
            .string("Ник должен быть строкой")
            .regex(/1\.\d{1,2}\.\d{1,2}/, "Неверно введена версия"),
        username: z
            .string()
            .min(3, "Минимальная длина ника - 3 символа").max(16, "Максимальная длина ника - 16 символов")
            .regex(/^[a-zA-Z0-9_]+$/, "Ник может содержать только английские буквы и _"),
        server: z.string(),
        port: z
            .coerce.number("Порт должен быть числом")
            .min(1, "Минимальное значение для порта - 1")
            .max(65535, "Максимальное значение для порта - 65535")
    })

export type BotConfig = z.infer<typeof BotConfigSchema>