import UserModel from "@/db/models/User";
import { UserType } from "@/type";
import { z } from "zod";
export async function POST(request: Request) {
    try {
        const body: UserType = await request.json();

        const user = await UserModel.getUserByEmail(body.email);
        if (user)
            return Response.json(
                { msg: "Email sudah terdaftar" },
                { status: 200 }
            );

        const result: string = await UserModel.create(body);
        return Response.json({ msg: result });
    } catch (error: any) {
        if (error instanceof z.ZodError)
            return Response.json(
                {
                    msg:
                        error.errors[0].path[0] + " " + error.errors[0].message,
                },
                { status: 400 }
            );
        return Response.json({ msg: "internal server error" }, { status: 500 });
    }
}
