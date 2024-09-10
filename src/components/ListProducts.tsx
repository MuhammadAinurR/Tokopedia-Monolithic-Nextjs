"use client";
import Image from "next/image";
import WishListRemoveButton from "./WishListRemoveButton";
import WishListAddButton from "./WishListAddButton";
import Link from "next/link";
import { ProductType } from "@/type";

export default function ListProduct({
    products,
    wishlist = false,
    onWishlistUpdate,
}: {
    products: ProductType[];
    wishlist?: boolean;
    onWishlistUpdate?: () => void;
}) {
    let IDR = new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 10,
    });

    return (
        <div className="grid grid-cols-6 gap-4">
            {products.map((product: ProductType, index: number) => {
                return (
                    <div key={index} className="rounded-xl shadow-md h-[350px]">
                        <Link href={`/products/${product.slug}`}>
                            <Image
                                className="rounded-t-xl h-[54%]"
                                priority
                                loader={() => product.thumbnail}
                                src={product.thumbnail}
                                unoptimized={true}
                                width={500}
                                height={500}
                                alt={product.name}
                            />
                        </Link>
                        <div className="h-[46%] p-2 text-xs flex flex-col justify-between">
                            <Link href={`/products/${product.slug}`}>
                                <p>{product.name}</p>
                            </Link>
                            <div className="flex flex-col gap-1">
                                <Link
                                    className="flex flex-col gap-1"
                                    href={`/products/${product.slug}`}
                                >
                                    <p className="font-bold text-base">
                                        {IDR.format(product.price)}
                                    </p>
                                    <p className="text-[#767D8F]">
                                        Jakarta Barat
                                    </p>
                                </Link>
                                <div className="flex justify-between">
                                    <div className="flex gap-1 text-[#767D8F]">
                                        <span>
                                            <svg
                                                className="unf-icon"
                                                viewBox="0 0 24 24"
                                                width={16}
                                                height={16}
                                                fill="var(--YN300, #FFC400)"
                                                style={{
                                                    display: "inline-block",
                                                    marginRight: 5,
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z" />
                                            </svg>

                                            <span
                                                className="main"
                                                data-testid="lblPDPDetailProductRatingNumber"
                                            >
                                                4.2
                                            </span>
                                        </span>
                                        <p>|</p>
                                        <p>78</p>
                                        <p>terjual</p>
                                    </div>
                                    {!wishlist && (
                                        <WishListAddButton
                                            productId={String(product._id)}
                                        />
                                    )}
                                </div>
                                {wishlist && (
                                    <div className="flex justify-between gap-2">
                                        <WishListRemoveButton
                                            productId={String(product._id)}
                                            onRemove={onWishlistUpdate}
                                        />
                                        <button className="border border-[#03AC0E] rounded-md px-3 py-1 hover:cursor-pointer h-[32px] w-2/3">
                                            <p className="text-xs text-[#03AC0E]">
                                                + Keranjang
                                            </p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
