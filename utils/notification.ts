import Container from "typedi";
import { EnvironmentVariables } from "../config/env-variables";
const ENV_VARS = Container.get(EnvironmentVariables);
import { WebClient } from "@slack/web-api";
import axios from "axios";
import { google } from "googleapis";

// slack
const slackClient = new WebClient(ENV_VARS.BOT_TOKEN);

export async function sendSlackMessage(text: string) {
    try {
        return await slackClient.chat.postMessage({
            channel: ENV_VARS.SLACK_CHANNEL_ID,
            text,
        });
    } catch (err: any) {
        return new Error(err.message || "Error while sending slack");
    }
}
