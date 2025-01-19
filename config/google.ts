import Container from "typedi";
import { google } from "googleapis";
import { EnvironmentVariables } from "../config/env-variables";
const ENV_VARIABLES = Container.get(EnvironmentVariables);

const creds = {
    type: "service_account",
    project_id: ENV_VARIABLES.SP_PROJECT_ID,
    private_key_id: ENV_VARIABLES.SP_PRIVATE_KEY_ID,
    private_key: ENV_VARIABLES.SP_PRIVATE_KEY,
    client_email: ENV_VARIABLES.SP_CLIENT_EMAIL,
    client_id: ENV_VARIABLES.SP_CLIENT_ID,
    auth_uri: ENV_VARIABLES.SP_AUTH_URI,
    token_uri: ENV_VARIABLES.SP_TOKEN_URI,
    auth_provider_x509_cert_url: ENV_VARIABLES.SP_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: ENV_VARIABLES.SP_CLIENT_CERT_URL,
};

export const googleAuth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: [
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ],
});

export const googleDrive = google.drive({ version: "v3", auth: googleAuth });
