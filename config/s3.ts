import { S3 } from "aws-sdk";
import Container from "typedi";
import { EnvironmentVariables } from "./env-variables";
const ENV_VARS = Container.get(EnvironmentVariables);

export const s3: AWS.S3 = new S3({
    accessKeyId: ENV_VARS.AWS_ID,
    secretAccessKey: ENV_VARS.AWS_SECRET,
    region: "ap-south-1",
    signatureVersion: "v4",
});

export const BUCKET_NAME: string = ENV_VARS.BUCKET_NAME;
