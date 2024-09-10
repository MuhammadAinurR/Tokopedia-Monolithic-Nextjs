"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ListProduct from "@/components/ListProducts";
import { ProductType } from "@/type";

const SearchPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [empty, setEmpty] = useState<boolean>(true);

    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("searchQuery");
        if (query) {
            fetchProducts(query);
        }
    }, [searchParams]);

    const fetchProducts = async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + `/api/search?q=${query}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            console.log(data);
            if (data.length === 0) setEmpty(true);
            if (data.length > 0) setEmpty(false);
            setProducts(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex-grow overflow-y-scroll">
                <div className="flex justify-center py-3 h-full">
                    <div className="w-[64%] h-full">
                        <p className="text-2xl font-bold mb-[12px]">
                            Search Result
                        </p>
                        {loading ? (
                            <div>Sedang mencari produk...</div>
                        ) : empty ? (
                            <p>Maaf, produk tidak tersedia untuk saat ini</p>
                        ) : (
                            <ListProduct products={products} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
