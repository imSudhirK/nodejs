import express from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    renewToken,
} from "../controllers/users";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/renew-token", renewToken);
router.get("/logout", logoutUser);

export default router;
