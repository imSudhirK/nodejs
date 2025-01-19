import { UserType } from "../models/one";

declare global {
    namespace Express {
        interface Request {
            userData: UserType;
        }
    }
}
