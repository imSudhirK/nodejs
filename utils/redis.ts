import Container from "typedi";
import { DatabaseModels } from "../config/database";

const databaseModels = Container.get(DatabaseModels);
const redisClient = databaseModels.redisConnection;

export async function readFromRedis(key: string) {
    const data = await redisClient.get(key);
    try {
        return JSON.parse(data!);
    } catch (err) {
        return data;
    }
}

export async function writeToRedis(key: string, value: any, expiresAt: number) {
    await redisClient.set(key, JSON.stringify(value), { EX: expiresAt });
}

export async function deleteFromRedis(key: string) {
    return redisClient.del(key);
}

export async function updateInRedis(key: string, value: any) {
    const remainingTimeToExpire = await redisClient.ttl(key);
    await redisClient.set(key, value);
    if (remainingTimeToExpire) {
        await redisClient.expire(key, remainingTimeToExpire);
    }
}
