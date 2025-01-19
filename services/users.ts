import { Service } from "typedi";
import { UsersDatabase } from "../databases/users-database";
import { generateHash, validateBcryptedKey } from "../utils/bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
    validateJwtTokens,
} from "../utils/jwt";
import { TokenLogs } from "../databases/token-logs";
import { getFutureDate } from "../utils/moment";
import { deleteFromRedis, writeToRedis } from "../utils/redis";

@Service()
export class UsersService {
    constructor(
        private readonly usersDatabase: UsersDatabase,
        private readonly tokenLogDb: TokenLogs,
    ) {}

    async createUser(name: string, email: string, password: string) {
        const existingUser = await this.usersDatabase.fetchUserByEmail(email);
        if (existingUser) {
            return new Error(`Email: ${email} already registered.`);
        }

        const hashedPassword = await generateHash(password);

        await this.usersDatabase.createUser({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return "User Registered Successfully";
    }

    async loginUser(email: string, password: string) {
        const existingUser = await this.usersDatabase.fetchUserByEmail(email);
        if (!existingUser) {
            return new Error(`Incorrect Email`);
        }

        const isCorrectPassword = await validateBcryptedKey(
            password,
            existingUser.password!,
        );
        if (!isCorrectPassword) return new Error(`Incorrect Password`);

        const userData = {
            userId: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
        };
        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        await writeToRedis(accessToken, userData, 60 * 60);

        await this.tokenLogDb.saveToLog({
            accessToken: accessToken,
            accessTokenExpiresAt: getFutureDate(60),
            refreshToken: refreshToken,
            refreshTokenExpiresAt: getFutureDate(0, 0, 1),
            status: true,
            userId: existingUser.id,
        });
        return { accessToken, refreshToken };
    }

    async renewToken(refreshToken: string) {
        const decodedData = validateJwtTokens(refreshToken);
        if (decodedData instanceof Error) {
            return new Error("Invalid Refresh Token");
        }
        const tokenLog = await this.tokenLogDb.findByRefreshToken(refreshToken);
        if (!tokenLog) return new Error("Expired Refresh Token");

        const userData = {
            userId: decodedData.userId,
            name: decodedData.name,
            email: decodedData.email,
        };
        const accessToken = generateAccessToken(userData);

        await deleteFromRedis(tokenLog.accessToken);
        await writeToRedis(accessToken, userData, 60 * 60);

        tokenLog.accessToken = accessToken;
        tokenLog.accessTokenExpiresAt = getFutureDate(60);
        await tokenLog.save();

        return { accessToken };
    }

    async logoutUser(accessToken: string) {
        await deleteFromRedis(accessToken);
        const result = await this.tokenLogDb.findAndExpireToken(accessToken);
        if (!result) return new Error("Already logged out");
        return "Logged out Successfully";
    }
}
