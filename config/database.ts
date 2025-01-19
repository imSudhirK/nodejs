import { Service } from "typedi";
import { connect } from "mongoose";
import { EnvironmentVariables } from "./env-variables";
import { createClient } from "redis";
import { Sequelize } from "sequelize";
import { initModels } from "@imsudhirk/models";

@Service()
export class DatabaseModels {
    redisConnection;
    dbSequelize;
    dbModels;

    constructor(private readonly ENV_VARS: EnvironmentVariables) {
        // mongo connection
        connect(this.ENV_VARS.MONGO_URI)
            .then(() => {
                console.log("Mongo DB Connected");
            })
            .catch((err) => {
                console.log("Error Connecting to Mongo: ", err);
            });

        // redis connection
        this.redisConnection = createClient({
            url: `redis://${this.ENV_VARS.REDIS_HOST}:6379/`,
            socket: { connectTimeout: 60000, tls: false },
        });
        this.redisConnection
            .connect()
            .then(() => {
                console.log("Redis Connected");
            })
            .catch((err: any) => {
                console.error("Error in connecting to redis\n", err);
            });

        // postgres connection
        this.dbSequelize = new Sequelize({
            dialect: "postgres",
            logging: false,
            replication: {
                read: [
                    {
                        host: this.ENV_VARS.DB_HOST,
                        database: this.ENV_VARS.DB_NAME,
                        username: this.ENV_VARS.DB_USER,
                        password: this.ENV_VARS.DB_PASS,
                    },
                ],
                write: {
                    host: this.ENV_VARS.DB_HOST,
                    database: this.ENV_VARS.DB_NAME,
                    username: this.ENV_VARS.DB_USER,
                    password: this.ENV_VARS.DB_PASS,
                },
            },
        });
        this.dbModels = initModels(this.dbSequelize);
    }
}
