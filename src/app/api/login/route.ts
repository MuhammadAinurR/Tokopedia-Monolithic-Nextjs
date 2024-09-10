import { comparePassword } from "@/db/helpers/bcrypt";
import { signToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/User";
import { UserType } from "@/type";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const body: UserType = await request.json();
        const user: UserType = await UserModel.getUserByEmail(body.email);
        if (!user) throw { message: "User Not Found", status: 404 };

        const isValidPassword = comparePassword(body.password, user.password);
        if (!isValidPassword)
            throw { message: "Invalid Email/Password", status: 400 };

        const token = signToken({ email: user.email, _id: String(user._id) });

        cookies().set("Authorization", `Bearer ${token}`, {
            domain: process.env.COOKIES_DOMAIN,
            httpOnly: false,
            path: "/",
        });

        return Response.json({ accessToken: token });
    } catch (error: any) {
        if (error instanceof z.ZodError)
            return Response.json(
                {
                    msg:
                        error.errors[0].path[0] + " " + error.errors[0].message,
                },
                { status: 400 }
            );

        if (error.message == "Invalid Email/Password")
            return Response.json({ msg: error.message }, { status: 401 });

        return Response.json({ msg: "internal server error" }, { status: 500 });
    }
}
