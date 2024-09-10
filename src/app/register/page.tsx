"use client";
import showToast from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Register() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: emailOrPhone,
                        password,
                        username,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                if (data.msg === "Email sudah terdaftar") {
                    showToast({ message: "Email sudah terdaftar" });
                    showToast({
                        message:
                            "Silakan daftar menggunakan email lain atau login dengan akun yang sudah ada",
                    });
                } else {
                    showToast({
                        message: "Berhasil membuat akun, silakan login",
                        type: "success",
                    });
                    router.push("/login");
                }
            } else {
                showToast({ message: "Gagal Register" });
                switch (data.msg) {
                    case "email Invalid email format":
                        setError("Format email kurang tepat");
                        break;
                    case "username String must contain at least 3 character(s)":
                        setError("Username minimal 3 huruf");
                        break;
                    case "password String must contain at least 7 character(s)":
                        setError("Password minimal 7 character");
                        break;

                    default:
                        setError("Gagal Register");
                        break;
                }
            }
        } catch (err) {
            console.error("Error during register:", err);
            setError("An error occurred while logging in.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-screen items-center">
            <div className="w-full">
                <Link href="/">
                    <p className="text-[#42B549] text-5xl font-medium text-center mb-20">
                        tokopaedi
                    </p>
                </Link>
                <form onSubmit={handleSubmit} className="grid grid-cols-2">
                    <div className="w-full flex justify-end px-10">
                        <div>
                            <Image
                                priority
                                className="w-[400px] h-[400px]"
                                src="/register.png"
                                width={400}
                                height={400}
                                alt="Picture of the author"
                            />
                            <p className="font-bold text-xl text-center text-[#40444E]">
                                Jual Beli Mudah Hanya di Tokopaedi
                            </p>
                            <p className="text-base font-thin text-center text-gray-400">
                                Gabung dan rasakan kemudahan bertransaksi di
                                Tokopaedi
                            </p>
                        </div>
                    </div>
                    <div className="shadow-lg border rounded-xl w-[400px] p-6 mx-10">
                        <div className="my-1 mb-5 flex flex-col w-full items-center">
                            <p className="text-2xl font-bold text-[#40444E]">
                                Daftar Sekarang
                            </p>
                            <p className="font-thin">
                                Sudah punya akun Tokopaedi?{" "}
                                <Link
                                    href="/login"
                                    className="text-sm text-[#29AF66] font-thin"
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="  flex justify-center w-full text-center text-base py-2 rounded-md text-[#6C7587] border border-gray-300">
                                Google
                            </button>
                        </div>
                        <div className="flex items-center my-6 opacity-30">
                            <div className="border-t border-[#2D323C] flex-grow"></div>
                            <span className="mx-4 font-thin text-sm">atau</span>
                            <div className="border-t border-[#2D323C] flex-grow"></div>
                        </div>
                        <div className="relative w-full min-w-[200px] h-10">
                            <input
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#42B549]"
                                placeholder=" "
                                value={emailOrPhone}
                                onChange={(e) =>
                                    setEmailOrPhone(e.target.value)
                                }
                                required
                            />
                            <label className="text-gray-300 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#42B549] before:border-blue-gray-200 peer-focus:before:!border-[#42B549] after:border-blue-gray-200 peer-focus:after:!border-[#42B549]">
                                Email
                            </label>
                        </div>

                        <p className="text-start text-xs font-thin text-[#6C7587] ml-3 my-1">
                            Contoh: 085731966274
                        </p>
                        <div className="relative w-full min-w-[200px] h-10">
                            <input
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#42B549]"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                required
                            />
                            <label className="text-gray-300 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#42B549] before:border-blue-gray-200 peer-focus:before:!border-[#42B549] after:border-blue-gray-200 peer-focus:after:!border-[#42B549]">
                                Username
                            </label>
                        </div>
                        <div className="relative w-full min-w-[200px] h-10 mt-3">
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

                        <button className="mt-5 bg-[#00AA5B] flex justify-center w-full text-center text-base py-3 rounded-md text-white">
                            {isLoading ? "Memuat..." : "Daftar"}
                        </button>
                        {error && (
                            <p className="text-red-500 text-center mt-2">
                                {error}
                            </p>
                        )}
                        <div className="flex flex-col items-center text-xs mt-5">
                            <p>Dengan mendaftar, saya menyetujui</p>
                            <p>
                                <Link className="text-[#04A95B]" href="">
                                    {" "}
                                    Syarat & Ketentuan
                                </Link>{" "}
                                serta{" "}
                                <Link className="text-[#04A95B]" href="">
                                    Kebijakan Privasi Tokopaedi
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
