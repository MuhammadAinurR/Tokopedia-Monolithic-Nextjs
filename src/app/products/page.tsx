"use client";
import InfinityProducts from "@/components/InfiniteScroll";
import Navbar from "@/components/Navbar";

export default function Products() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-scroll">
                <div className="flex justify-center py-3 h-auto">
                    <div className="w-[64%] h-auto">
                        <p className="text-2xl font-bold mb-[12px]">
                            Rekomendasi untukmu
                        </p>
                        <InfinityProducts />
                    </div>
                </div>
            </div>
        </div>
    );
}
