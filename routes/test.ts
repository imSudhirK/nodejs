import express from "express";
import { createGoogleSheet, readGoogleSheet } from "../utils/google-sheet";
import { executeProgram } from "../utils/executable";
const router = express.Router();

router.get("/make-google-sheet", async (req, res) => {
    try {
        const resp = await readGoogleSheet("Test Title", "Test");
        if (resp instanceof Error) {
            return res.status(422).send(resp.message);
        }
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/execute-program", async (req, res) => {
    try {
        const resp = await executeProgram();
        console.log(resp);
        if (resp instanceof Error) {
            return res.status(422).send(resp.message);
        }
        return res.status(200).send(resp);
    } catch (err) {
        return res.sendStatus(500);
    }
});

export default router;
