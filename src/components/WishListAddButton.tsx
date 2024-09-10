"use client";
import showToast from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

export default function WishListAddButton({
    productId,
}: {
    productId: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    const addWishlistHit = async (productId: string) => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                }),
            }
        );
        const data = await response.json();

        if (response.ok) {
            if (
                data.msg ===
                "Gagal menambahkan wishlist, item sudah ada dalam wishlist"
            )
                showToast({ message: data.msg });
            if (data.msg === "Telah berhasil menambahkan wishlist") {
                showToast({ message: data.msg, type: "success" });
            }
        } else {
            showToast({
                message:
                    "Silakan login terlebih dahulu untuk menambahkan ke wishlist",
            });
            router.push("/login");
        }
    };

    const addToWishlist = () => {
        addWishlistHit(productId);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            <button
                onClick={toggleMenu}
                className="cursor-pointer text-gray-500 hover:bg-gray-200 px-2 rounded-full"
            >
                •••
            </button>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-0 left-10 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                    <button
                        onClick={addToWishlist}
                        className="block w-full px-4 py-2 text-center text-gray-500 hover:bg-blue-100"
                    >
                        Simpan ke Wishlist
                    </button>
                </div>
            )}
        </div>
    );
}
