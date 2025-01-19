import jwt from "jsonwebtoken";
import Container from "typedi";
import { EnvironmentVariables } from "../config/env-variables";
import { UserType } from "../models/one";
const ENV_VARS = Container.get(EnvironmentVariables);

export function generateAccessToken(user: UserType) {
    const accessToken = jwt.sign(user, ENV_VARS.JWT_SECRET, {
        expiresIn: ENV_VARS.ACCESS_TOKEN_EXPIRY,
    });
    return accessToken;
}

export function generateRefreshToken(user: UserType) {
    const refreshToken = jwt.sign(user, ENV_VARS.JWT_SECRET, {
        expiresIn: ENV_VARS.REFRESH_TOKEN_EXPIRY,
    });
    return refreshToken;
}

export function validateJwtTokens(token: string) {
    try {
        return jwt.verify(token, ENV_VARS.JWT_SECRET) as UserType;
    } catch (err) {
        return new Error(`Invalid access token`);
    }
}
