import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import ButtonLogout from "./ButtonLogout";

export default function Navbar() {
    return (
        <>
            <div className="px-[32px] h-[32px] flex justify-between bg-[#F0F3F7] text-xs items-center">
                <div className="text-gray-500 h-full">
                    <div className="flex h-full items-center gap-2">
                        <Image
                            className="w-auto rounded-t-xl h-[54%]"
                            priority
                            unoptimized={true}
                            src="/smartphone.png"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                        />
                        <p className="hover:text-[#1CB36D]">
                            Download Tokopaedi App
                        </p>
                    </div>
                </div>
                <div className="flex text-gray-500 gap-11">
                    <p className="hover:text-[#1CB36D]">Tentang Tokopaedi</p>
                    <p className="hover:text-[#1CB36D]">Mitra Tokopaedi</p>
                    <p className="hover:text-[#1CB36D]">Mulai Berjualan</p>
                    <p className="hover:text-[#1CB36D]">Promo</p>
                    <p className="hover:text-[#1CB36D]">Tokopaedi Care</p>
                </div>
            </div>

            <div className="h-[64px] px-[32px] content-center">
                <div className="flex">
                    <div className="w-[15%] flex justify-between pr-5 items-center">
                        <Link href="/" className="hover:cursor-pointer">
                            <p className="text-[#03AC0E] text-3xl">tokopaedi</p>
                        </Link>
                        <div>
                            <p className=" text-sm content-center opacity-70 text-[#212121]">
                                Kategori
                            </p>
                        </div>
                    </div>
                    <div className="w-[70%] my-3">
                        <Search />
                    </div>
                    <div className="w-[15%] content-center flex justify-end items-center gap-3">
                        <ButtonLogout />
                    </div>
                </div>
            </div>

            <div className="flex justify-center px-[32px]">
                <div className="w-[70%] flex justify-start font-base text-[#6D7588] text-xs gap-5">
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Kulkas 2 Pintu
                    </p>
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Filter Air
                    </p>
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Lampu Gantung
                    </p>
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Kursi Lipat
                    </p>
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Beras Porang
                    </p>
                    <p className="hover:text-[#1CB36D] hover:cursor-pointer">
                        Lampu Led
                    </p>
                </div>
            </div>
            <hr className="w-full  bg-gray-300 border-1/2 mt-2" />
        </>
    );
}
