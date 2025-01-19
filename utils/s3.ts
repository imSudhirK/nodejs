import { BUCKET_NAME, s3 } from "../config/s3";

export async function getSignedUrl(
    key: string,
    signedUrlExpireSeconds: number,
    bucketName: string = BUCKET_NAME,
) {
    return s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });
}

export async function getSignedUrlForUpload(
    key: string,
    signedUrlExpireSeconds: number,
    bucketName: string = BUCKET_NAME,
    metaData?: { [key: string]: string },
    contentType = "multipart/form-data",
) {
    return s3.getSignedUrl("putObject", {
        Bucket: bucketName,
        Key: key,
        Expires: signedUrlExpireSeconds,
        MetaData: metaData,
        ContentType: contentType,
    });
}

export async function checkIfFileExists(
    key: string,
    bucketName: string = BUCKET_NAME,
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        s3.headObject({ Bucket: bucketName, Key: key }, (err) => {
            if (!err) {
                resolve(true);
            } else if (err.code === "NotFound") {
                resolve(false);
            } else {
                reject(err);
            }
        });
    });
}

export async function deleteFile(
    key: string,
    bucketName: string = BUCKET_NAME,
) {
    return await s3
        .deleteObject({
            Bucket: bucketName,
            Key: key,
        })
        .promise();
}
