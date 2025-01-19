import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import { cors } from "./cors";
import routes from "./routes";
import { DatabaseModels } from "./config/database";
import { EnvironmentVariables } from "./config/env-variables";

Container.get(DatabaseModels);
const ENV_VARS = Container.get(EnvironmentVariables);

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors);
app.use("/", routes);

const PORT = ENV_VARS.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
