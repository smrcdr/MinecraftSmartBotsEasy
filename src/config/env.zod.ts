import {z} from "zod";

const envSchema = z
    .object({
        NODE_ENV: z.enum(["dev", "prod", "test"]),
        LOG_LEVEL: z.enum(["info", "trace", "debug", "warn", "fatal", "error"]),
    })

export const env = envSchema.parse(Bun.env)