// components/InfinityProducts.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import ListProduct from "./ListProducts";

interface InfinityProductsProps {
    limit?: number;
}

export default function InfinityProducts({
    limit = 18,
}: InfinityProductsProps) {
    const [scrollTrigger, isInView] = useInView();
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +
                `/api/products/?offset=${offset}&limit=${limit}`
        );
        const json = await res.json();

        if (json.length < limit) {
            setHasMore(false);
        }

        setProducts((prev) => (prev.length === 0 ? json : [...prev, ...json]));
        setOffset((prev) => prev + limit);
        setIsLoading(false);
    }, [offset, isLoading, hasMore, limit]);

    useEffect(() => {
        if (isInView && hasMore) {
            fetchProducts();
        }
    }, [isInView, hasMore, fetchProducts]);

    return (
        <div className="w-full h-auto">
            <ListProduct products={products} />
            <div className="flex justify-center mt-4">
                {hasMore ? (
                    <div ref={scrollTrigger}>Loading...</div>
                ) : (
                    <p>No more posts to load</p>
                )}
            </div>
        </div>
    );
}
