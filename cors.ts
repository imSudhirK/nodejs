import { Request, Response, NextFunction } from "express";

export const cors = function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    } else {
        next();
    }
};
