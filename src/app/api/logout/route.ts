import { cookies } from "next/headers";

export async function POST() {
    try {
        cookies().set("Authorization", `Bearer`, {
            domain: process.env.COOKIES_DOMAIN,
            httpOnly: false,
            path: "/",
            expires: new Date(),
        });
        return Response.json({ msg: "Berhasil Logout" });
    } catch (error: any) {
        console.log(error);
        return Response.json({ msg: "internal server error" }, { status: 500 });
    }
}
