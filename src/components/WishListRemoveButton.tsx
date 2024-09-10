"use client";

import showToast from "@/utils/toast";
import { useState } from "react";

export default function WishListRemoveButton({
    productId,
    onRemove,
}: {
    productId: string;
    onRemove?: () => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleRemove = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId }),
                }
            );

            if (response.ok) {
                showToast({
                    message: "Berhasil menghapus item dari wishlist",
                    type: "success",
                });
                onRemove?.(); // Call the onRemove callback if provided
            } else {
                console.error("Failed to remove from wishlist");
            }
        } catch (error) {
            console.error("Error removing wishlist item", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleRemove}
            disabled={loading}
            className="border border-red-500 rounded-md px-3 py-1 text-red-500 hover:cursor-pointer"
        >
            {loading ? "Removing..." : "Remove"}
        </button>
    );
}
