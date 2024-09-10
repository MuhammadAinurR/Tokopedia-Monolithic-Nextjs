import { cookies } from "next/headers";
import { verifyWithJose } from "./db/helpers/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const auth = cookies().get("Authorization");

    if (request.nextUrl.pathname.startsWith("/wishlists")) {
        if (!auth) {
            return NextResponse.redirect(new URL(" /login", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
        if (!auth)
            return Response.json(
                { msg: "authentication failed" },
                { status: 401 }
            );

        const [type, token] = auth.value.split(" ");
        if (type !== "Bearer")
            return Response.json(
                { msg: "authentication failed" },
                { status: 401 }
            );

        const decoded = await verifyWithJose<{ email: string; _id: string }>(
            token
        );
        const requestHeaders = new Headers(request.headers);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        response.headers.set("x-email", decoded.email);
        response.headers.set("x-id", decoded._id);

        return response;
    }
}

export const config = {
    matcher: ["/api/wishlists/:path*", "/wishlists"],
};
