import { Service } from "typedi";
import { TokenLogModel } from "@imsudhirk/models";
import { getCurrentDate } from "../utils/moment";

@Service()
export class TokenLogs {
    private tokenLogCollection;

    constructor() {
        this.tokenLogCollection = TokenLogModel.default;
    }

    saveToLog(tokenLog: TokenLogModel.TokenLog) {
        return new this.tokenLogCollection(tokenLog).save();
    }

    checkByAccessToken(accessToken: string) {
        return this.tokenLogCollection
            .findOne({
                accessToken: accessToken,
                accessTokenExpiresAt: {
                    $gt: getCurrentDate(),
                },
            })
            .lean();
    }

    findByRefreshToken(refreshToken: string) {
        return this.tokenLogCollection.findOne({
            refreshToken: refreshToken,
            refreshTokenExpiresAt: {
                $gt: getCurrentDate(),
            },
        });
    }

    findAndExpireToken(accessToken: string) {
        return this.tokenLogCollection.findOneAndUpdate(
            { accessToken: accessToken },
            {
                $set: {
                    accessTokenExpiresAt: getCurrentDate(),
                    refreshTokenExpiresAt: getCurrentDate(),
                },
            },
        );
    }
}
