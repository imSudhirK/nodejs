import { Service } from "typedi";
import { NotesModel } from "@imsudhirk/models";

@Service()
export class NotesDatabase {
    private notesCollection;

    constructor() {
        this.notesCollection = NotesModel.default;
    }

    createNotes(notes: NotesModel.Notes) {
        return new this.notesCollection(notes).save();
    }

    fetchNotes(email: string) {
        return this.notesCollection.find({ email });
    }

    updateNotes(id: string, updateFields: { [key: string]: string }) {
        return this.notesCollection.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: true },
        );
    }

    deleteNotes(id: string) {
        return this.notesCollection.findByIdAndDelete({ _id: id });
    }
}
