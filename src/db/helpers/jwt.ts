const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT;
import * as jose from "jose";

export function signToken(payload: { _id: string; email: string }): string {
    return jwt.sign(payload, jwtSecret);
}

export async function verifyWithJose<T>(token: string) {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jose.jwtVerify<T>(token, secret);
    return payload;
}
