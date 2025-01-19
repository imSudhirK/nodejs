import { Request, Response } from "express";
import { Container } from "typedi";
import { NotesService } from "../services/notes";
import { validateCreateNotes, validateUpdateNotes } from "../validations/notes";

export async function createNotes(req: Request, res: Response) {
    try {
        const validateQueries = validateCreateNotes(req.body);
        if (validateQueries.error) {
            return res.status(400).send(validateQueries.error.message);
        }
        const { email } = req.userData;
        const { title, description, tag } = req.body;
        const notesService = Container.get(NotesService);
        const resp = await notesService.createNotes(
            email,
            title,
            description,
            tag,
        );
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.sendStatus(200);
    } catch (err: any) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function fetchNotes(req: Request, res: Response) {
    try {
        const { email } = req.userData;
        const notesService = Container.get(NotesService);
        const resp = await notesService.fetchNotes(email);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err: any) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function updateNotes(req: Request, res: Response) {
    try {
        const validateQueries = validateUpdateNotes(req.body);
        if (validateQueries.error) {
            return res.status(400).send(validateQueries.error.message);
        }
        const { id, title, description, tag } = req.body;
        const notesService = Container.get(NotesService);
        const resp = await notesService.updateNotes(
            id,
            title,
            description,
            tag,
        );
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err: any) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function deleteNotes(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const notesService = Container.get(NotesService);
        const resp = await notesService.deleteNotes(id);
        if (resp instanceof Error) return res.status(422).send(resp.message);
        return res.status(200).send(resp);
    } catch (err: any) {
        console.log(err);
        return res.sendStatus(500);
    }
}
