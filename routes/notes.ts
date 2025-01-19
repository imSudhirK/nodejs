import express from "express";
import {
    createNotes,
    fetchNotes,
    updateNotes,
    deleteNotes,
} from "../controllers/notes";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/create", auth, createNotes);
router.get("/fetch", auth, fetchNotes);
router.post("/update", auth, updateNotes);
router.get("/:id/delete", auth, deleteNotes);

export default router;
