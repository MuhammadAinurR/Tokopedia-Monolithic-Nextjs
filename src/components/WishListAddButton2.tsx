"use client";

import showToast from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function WishListAddButton2({
    productId,
}: {
    productId: string;
}) {
    const router = useRouter();
    const addWishlistHit = async () => {
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
            ) {
                showToast({ message: data.msg });
            }
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
    return (
        <p
            onClick={addWishlistHit}
            className="hover:cursor-pointer text-xs font-bold text-center border border-t-0 border-b-0 border-gray-300"
        >
            Wishlist
        </p>
    );
}
