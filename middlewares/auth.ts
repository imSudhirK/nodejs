import Container from "typedi";
import { Request, Response, NextFunction } from "express";
import { TokenLogs } from "../databases/token-logs";
import { readFromRedis, writeToRedis } from "../utils/redis";
import { getRemainingTime } from "../utils/moment";
import { validateJwtTokens } from "../utils/jwt";

export async function auth(req: Request, res: Response, next: NextFunction) {
    const clientIp = (req.headers["X-Forwarded-For"] as string) || req.ip;
    try {
        const accessToken =
            ((req.headers["authorization"] ||
                req.headers["Authorization"]) as string) || undefined;
        if (!accessToken) {
            return res.status(401).send("Token Not Provided");
        }

        const userData = await findByAccessToken(accessToken);
        if (userData instanceof Error) {
            return res.status(401).send(userData.message);
        }
        req.userData = userData;
        next();
    } catch (err) {
        console.log(clientIp);
        return res.sendStatus(500);
    }
}

async function findByAccessToken(accessToken: string) {
    const user = await readFromRedis(accessToken);
    if (user) return user;

    const tokenLogDb = Container.get(TokenLogs);
    const tokenData = await tokenLogDb.checkByAccessToken(accessToken);
    if (!tokenData) return new Error("Invalid Access Token");
    const accessTokenExpiry = getRemainingTime(tokenData.accessTokenExpiresAt);
    if (!accessTokenExpiry) return new Error("Expired Access Token");

    const decodedData = validateJwtTokens(accessToken);
    if (decodedData instanceof Error) return new Error("Expired Access Token");
    const userData = {
        userId: decodedData.userId,
        name: decodedData.name,
        email: decodedData.email,
    };

    writeToRedis(accessToken, userData, accessTokenExpiry);
    return userData;
}
