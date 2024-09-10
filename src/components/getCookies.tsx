import { cookies } from "next/headers";
export default function getCookies() {
    const auth = cookies().get("Authorization");
    return auth;
}
