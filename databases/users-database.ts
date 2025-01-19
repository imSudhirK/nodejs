import { Service } from "typedi";
import { UsersModel } from "@imsudhirk/models";
@Service()
export class UsersDatabase {
    private usersCollection;

    constructor() {
        this.usersCollection = UsersModel.default;
    }

    async createUser(user: UsersModel.User) {
        return new this.usersCollection(user).save();
    }

    async fetchUserByEmail(email: string) {
        return this.usersCollection.findOne({ email: email });
    }
}
