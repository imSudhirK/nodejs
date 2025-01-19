import { Service } from "typedi";
import { NotesDatabase } from "../databases/notes-database";
import { UsersDatabase } from "../databases/users-database";

@Service()
export class NotesService {
    constructor(
        private readonly notesDatabase: NotesDatabase,
        private readonly usersDatabase: UsersDatabase,
    ) {}

    async createNotes(
        email: string,
        title?: string,
        description?: string,
        tag?: string,
    ) {
        return await this.notesDatabase.createNotes({
            email,
            title,
            description,
            tag,
        });
    }

    async fetchNotes(email: string) {
        return await this.notesDatabase.fetchNotes(email);
    }

    async updateNotes(
        id: string,
        title?: string,
        description?: string,
        tag?: string,
    ) {
        const updateFields: { [key: string]: string } = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (tag) updateFields.tag = tag;

        const resp = await this.notesDatabase.updateNotes(id, updateFields);
        if (!resp) return new Error("Error updating notes");
        return resp;
    }

    async deleteNotes(id: string) {
        const resp = await this.notesDatabase.deleteNotes(id);
        if (!resp) return new Error("Notes not found");
        return "Notes deleted successfully";
    }
}
