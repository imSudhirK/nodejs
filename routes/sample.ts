import express from "express";
import { writeToRedis } from "../utils/redis";
import {
    checkIfFileExists,
    deleteFile,
    getSignedUrl,
    getSignedUrlForUpload,
} from "../utils/s3";
import Container from "typedi";
import { sendSlackMessage } from "../utils/notification";
import { createGoogleSheet, readGoogleSheet } from "../utils/google-sheet";

const router = express.Router();

router.get("/read-google-sheet", async (req, res) => {
    try {
        const resp = await readGoogleSheet("Test Title", "Test");
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/make-google-sheet", async (req, res) => {
    try {
        const resp = await createGoogleSheet(
            { name: "sudhir", id: 123 },
            "Test Title",
            "Test",
        );
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.post("/send-slack", async (req, res) => {
    const text = "hello";
    try {
        await sendSlackMessage(text);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/redis", async (req, res) => {
    const key = "sudhir-testing";
    const value = { name: "sudhir", email: "sudhir@credflow.in" };
    try {
        await writeToRedis(key, value, 60);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/get-signed-url-to-upload", async (req, res) => {
    try {
        const documentKey = "test-file.pdf";
        const bucketName = "losapplication-development";
        const resp = await getSignedUrlForUpload(documentKey, 7200, bucketName);
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/get-signed-url", async (req, res) => {
    try {
        const documentKey = "test-file.pdf";
        const bucketName = "losapplication-development";
        const isfile = await checkIfFileExists(documentKey, bucketName);
        if (!isfile) return res.status(422).send("File Not Found");
        const resp = await getSignedUrl(documentKey, 7200, bucketName);
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/del-s3-file", async (req, res) => {
    try {
        const documentKey = "test-file.pdf";
        const bucketName = "losapplication-development";
        let isfile = await checkIfFileExists(documentKey, bucketName);
        if (!isfile) return res.status(422).send("File Not Found");
        const resp = await deleteFile(documentKey, bucketName);
        isfile = await checkIfFileExists(documentKey, bucketName);
        if (!isfile) return res.status(200).send("File deleted");
        return res.status(422).send("Error deleting file");
    } catch (err) {
        return res.sendStatus(500);
    }
});

export default router;
