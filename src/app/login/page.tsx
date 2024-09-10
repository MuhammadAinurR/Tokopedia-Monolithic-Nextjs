"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import showToast from "@/utils/toast";
export default function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("user1@mail.com");
    const [password, setPassword] = useState("user11234");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: emailOrPhone, password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                showToast({
                    message: "Selamat datang!",
                    type: "success",
                });
                router.push("/");
            } else {
                if (data.msg === "Invalid Email/Password")
                    setError("Email / Password salah");
                showToast({ message: "Gagal login" });
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An error occurred while logging in.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-screen items-center">
            <div className="w-[368px]">
                <Link href="/">
                    <p className="text-[#00AA5B] text-5xl font-medium text-center mb-20">
                        tokopaedi
                    </p>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className="shadow-lg border rounded-xl w-full p-6"
                >
                    <div className="my-1 mb-5 flex justify-between content-center items-center">
                        <p className="text-3xl font-bold text-[#40444E]">
                            Masuk
                        </p>
                        <Link href="/register">
                            <p className="text-sm text-[#00AA5B] font-thin">
                                Daftar
                            </p>
                        </Link>
                    </div>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#42B549]"
                            placeholder=" "
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            required
                        />
                        <label className="text-gray-300 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#42B549] before:border-blue-gray-200 peer-focus:before:!border-[#42B549] after:border-blue-gray-200 peer-focus:after:!border-[#42B549]">
                            Nomor HP atau Email
                        </label>
                    </div>

                    <p className="text-start text-xs font-thin text-[#6C7587] ml-3 my-1">
                        Contoh: 085731966274
                    </p>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            type="password"
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#42B549]"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="text-gray-300 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#42B549] before:border-blue-gray-200 peer-focus:before:!border-[#42B549] after:border-blue-gray-200 peer-focus:after:!border-[#42B549]">
                            Kata Sandi
                        </label>
                    </div>
                    <p className="text-end text-sm text-[#00AA5B] mb-4 font-thin">
                        Butuh bantuan?
                    </p>
                    <button
                        type="submit"
                        className={`bg-[#00AA5B] flex justify-center w-full text-center text-base py-3 rounded-md text-white ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Memuat..." : "Masuk"}
                    </button>
                    {error && (
                        <p className="text-red-500 text-center mt-2">{error}</p>
                    )}
                    <div className="flex items-center my-6 opacity-30">
                        <div className="border-t border-[#2D323C] flex-grow"></div>
                        <span className="mx-4 font-thin text-sm">atau</span>
                        <div className="border-t border-[#2D323C] flex-grow"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="flex justify-center w-full text-center text-base py-2 rounded-md text-[#6C7587] border border-gray-300">
                            Scan Kode QR
                        </button>
                        <button className="flex justify-center w-full text-center text-base py-2 rounded-md text-[#6C7587] border border-gray-300">
                            Masuk dengan Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
