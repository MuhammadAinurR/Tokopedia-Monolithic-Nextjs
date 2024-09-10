"use client";
import showToast from "@/utils/toast";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
    const cookies = useCookies();
    const isAuth = Boolean(cookies.get("Authorization"));
    const router = useRouter();

    const logoutHandle = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/logout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            showToast({
                message: "Berhasil Logout",
                type: "success",
            });
            router.push("/login");
        } else {
            showToast({ message: "Gagal Logout" });
        }
    };
    return (
        <>
            {" "}
            {!isAuth ? (
                <>
                    <Link href="login">
                        <button className="border border-green-600 rounded-md px-3 py-1 bg-white hover:cursor-pointer">
                            <p className="text-[#00AA5B] font-bold text-sm">
                                Masuk
                            </p>
                        </button>
                    </Link>
                    <Link href="register">
                        <button className="border border-green-600 rounded-md px-3 py-1 bg-[#00AA5B] hover:cursor-pointer">
                            <p className="text-white font-bold text-sm">
                                Daftar
                            </p>
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <button className="border border-[#00AA5B] rounded-md px-3 py-1 hover:cursor-pointer">
                        <p
                            onClick={() => {
                                router.push("/wishlist");
                            }}
                            className="text-[#00AA5B] font-bold text-sm"
                        >
                            Wishlist
                        </p>
                    </button>
                    <button className="border border-red-600 rounded-md px-3 py-1 hover:cursor-pointer">
                        <p
                            onClick={logoutHandle}
                            className="text-red-600 font-bold text-sm"
                        >
                            Logout
                        </p>
                    </button>
                </>
            )}
        </>
    );
}
