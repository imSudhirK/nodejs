import bcrypt from "bcrypt";
import Container from "typedi";
import { EnvironmentVariables } from "../config/env-variables";
const ENV_VARS = Container.get(EnvironmentVariables);

export async function generateHash(key: string) {
    const salt = await bcrypt.genSalt(ENV_VARS.BCRYPT_SALTROUND);
    const hashKey = await bcrypt.hash(key, salt);
    return hashKey;
}

export async function validateBcryptedKey(key: string, hash: string) {
    return await bcrypt.compare(key, hash);
}
