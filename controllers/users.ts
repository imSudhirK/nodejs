import { Request, Response } from "express";
import Container from "typedi";
import { UsersService } from "../services/users";
import { validateCreateUser, validateLoginUser } from "../validations/users";

export async function createUser(req: Request, res: Response) {
    try {
        const validateQueries = validateCreateUser(req.body);
        if (validateQueries.error) {
            return res.status(400).send(validateQueries.error.message);
        }
        const { name, email, password } = req.body;
        const usersService = Container.get(UsersService);
        const resp = await usersService.createUser(name!, email!, password!);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const validateQueries = validateLoginUser(req.body);
        if (validateQueries.error) {
            return res.status(400).send(validateQueries.error.message);
        }
        const { email, password } = req.body;
        const usersService = Container.get(UsersService);
        const resp = await usersService.loginUser(email!, password!);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function renewToken(req: Request, res: Response) {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.sendStatus(400);
        const usersService = Container.get(UsersService);
        const resp = await usersService.renewToken(authorization);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err: any) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function logoutUser(req: Request, res: Response) {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.sendStatus(400);
        const usersService = Container.get(UsersService);
        const resp = await usersService.logoutUser(authorization);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
