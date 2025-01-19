import express from "express";
import { connection } from "mongoose";
import notesRoutes from "./notes";
import usersRoute from "./users";
import testRoute from "./test";
import sampleRoutes from "./sample";

const router = express.Router();

router.use("/notes", notesRoutes);
router.use("/users", usersRoute);
router.use("/sample", sampleRoutes);
router.use("/test", testRoute);

// health status code
router.get("/health-status", async (req, res) => {
    if (!connection || connection.readyState == 0 || connection.readyState == 3)
        return res.sendStatus(500);
    return res.sendStatus(200);
});

export default router;
