"use client";
import ListProduct from "@/components/ListProducts";
import Navbar from "@/components/Navbar";
import { ProductType } from "@/type";
import { useEffect, useState } from "react";

export default function Wishlist() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [empty, setEmpty] = useState<boolean>(false);

    const fetchData = async () => {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists"
        );
        const result = await res.json();
        setProducts(result);
        if (result.length === 0) setEmpty(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleWishlistUpdate = () => {
        fetchData(); // Re-fetch the products when an item is removed
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center py-3 h-auto">
                <div className="w-[64%] h-auto">
                    <div className="w-full h-auto">
                        <p className="text-2xl font-bold mb-[12px]">
                            Semua Wishlist
                        </p>
                        {products.length ? (
                            <ListProduct
                                products={products}
                                wishlist={true}
                                onWishlistUpdate={handleWishlistUpdate} // Pass the update function
                            />
                        ) : empty ? (
                            <p>Belum ada barang wishlist</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
