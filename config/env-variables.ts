import { config } from "dotenv";
import { Service } from "typedi";

@Service()
export class EnvironmentVariables {
    PORT: number;
    TIMEZONE: string;
    MONGO_URI: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_HOST: string;
    REDIS_HOST: string;
    REDIS_CHANNEL: number;
    BCRYPT_SALTROUND: number;
    JWT_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_EXPIRY: string;
    AWS_ID: string;
    AWS_SECRET: string;
    BUCKET_NAME: string;
    S3_EXPIRY: number;
    BOT_TOKEN: string;
    SLACK_CHANNEL_ID: string;
    SP_FOLDER_ID: string;
    SP_PROJECT_ID: string;
    SP_PRIVATE_KEY_ID: string;
    SP_PRIVATE_KEY: string;
    SP_CLIENT_EMAIL: string;
    SP_CLIENT_ID: string;
    SP_AUTH_URI: string;
    SP_TOKEN_URI: string;
    SP_AUTH_PROVIDER_CERT_URL: string;
    SP_CLIENT_CERT_URL: string;
    constructor() {
        config();
        this.PORT = Number(process.env.PORT || 4000);
        this.TIMEZONE = (process.env.TIMEZONE || "Asia/Kolkata") as string;
        this.MONGO_URI = process.env.MONGO_URI as string;
        this.DB_USER = process.env.DB_USER as string;
        this.DB_PASS = process.env.DB_PASS as string;
        this.DB_NAME = process.env.DB_NAME as string;
        this.DB_HOST = process.env.DB_HOST as string;
        this.REDIS_HOST = process.env.REDIS_HOST as string;
        this.REDIS_CHANNEL = Number(process.env.REDIS_CHANNEL || 10);
        this.BCRYPT_SALTROUND = Number(process.env.BCRYPT_SALTROUND || 10);
        this.JWT_SECRET = (process.env.JWT_SECRET || "asdfghjkl") as string;
        this.ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY ||
            "60m") as string;
        this.REFRESH_TOKEN_EXPIRY = (process.env.REFRESH_TOKEN_EXPIRY ||
            "1d") as string;
        this.AWS_ID = process.env.AWS_ID as string;
        this.AWS_SECRET = process.env.AWS_SECRET as string;
        this.BUCKET_NAME = process.env.BUCKET_NAME as string;
        this.S3_EXPIRY = Number(process.env.S3_EXPIRY || 7200);
        this.BOT_TOKEN = process.env.BOT_TOKEN as string;
        this.SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID as string;
        this.SP_FOLDER_ID = process.env.SP_FOLDER_ID as string;
        this.SP_PROJECT_ID = process.env.SP_PROJECT_ID as string;
        this.SP_PRIVATE_KEY_ID = process.env.SP_PRIVATE_KEY_ID as string;
        this.SP_PRIVATE_KEY = process.env.SP_PRIVATE_KEY as string;
        this.SP_CLIENT_EMAIL = process.env.SP_CLIENT_EMAIL as string;
        this.SP_CLIENT_ID = process.env.SP_CLIENT_ID as string;
        this.SP_AUTH_URI = process.env.SP_AUTH_URI as string;
        this.SP_TOKEN_URI = process.env.SP_TOKEN_URI as string;
        this.SP_AUTH_PROVIDER_CERT_URL = process.env
            .SP_AUTH_PROVIDER_CERT_URL as string;
        this.SP_CLIENT_CERT_URL = process.env.SP_CLIENT_CERT_URL as string;
    }
}
