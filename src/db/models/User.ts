import { UserType } from "@/type";
import database from "../config/mongodb";
import { z } from "zod";
import { hashPassword } from "../helpers/bcrypt";

const UserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(7),
});

const LoginSchema = z.object({
    email: z.string().email({ message: "Inalid email format" }),
    password: z.string().min(7),
});

class UserModel {
    static collection() {
        return database.collection<UserType>("users");
    }

    static async create(payload: UserType) {
        const validation = UserSchema.safeParse(payload);
        if (!validation.success) throw validation.error;

        payload.password = hashPassword(payload.password);

        await this.collection().insertOne(payload);
        return "Success create user";
    }

    static async getUserByEmail(email: string): Promise<UserType> {
        const user = await this.collection().findOne({ email: email });

        return user as UserType;
    }
}

export default UserModel;
