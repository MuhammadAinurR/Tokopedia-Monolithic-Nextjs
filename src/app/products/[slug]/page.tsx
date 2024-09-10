import InfinityProducts from "@/components/InfiniteScroll";
import Navbar from "@/components/Navbar";
import WishListAddButton2 from "@/components/WishListAddButton2";
import { ProductType } from "@/type";
import Image from "next/image";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const product: ProductType = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`
    ).then((res) => res.json());

    return {
        title: "Tokopaedi - " + product.name,
        description: product.description,
        openGraph: {
            images: [product.thumbnail],
        },
    };
}

export default async function ProductDetail({
    params,
}: {
    params: { slug: string };
}) {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${params.slug}`
    );
    const product: ProductType = await res.json();

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-scroll">
                <div className="flex justify-center py-3 h-auto">
                    <div className="w-[64%] h-auto">
                        <div className="w-full h-auto">
                            <div className="flex p-3">
                                <div className="w-[34%]">
                                    <Image
                                        priority
                                        className="rounded-xl w-[348px] h-[348px]"
                                        src={product.thumbnail}
                                        unoptimized={true}
                                        width="348"
                                        height="348"
                                        alt="Picture of the author"
                                    />
                                    <div className=" gap-3 my-3 flex overflow-x-scroll w-[348px]">
                                        {product.images.map(
                                            (image: string, index: number) => {
                                                return (
                                                    <Image
                                                        key={index}
                                                        className="rounded-md w-[60px] h-[60px]"
                                                        priority
                                                        src={image}
                                                        unoptimized={true}
                                                        width="60"
                                                        height="60"
                                                        alt="Picture of the author"
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="w-[39%] text-sm">
                                    <p className="font-bold text-2xl">
                                        {product.name}
                                    </p>
                                    <div className="flex gap-2 text-[#767D8F]">
                                        <p className="text-black">Terjual</p>
                                        <p>80+</p>
                                        <p className="text-black">•</p>
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
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z" />
                                            </svg>

                                            <span
                                                className="text-black"
                                                data-testid="lblPDPDetailProductRatingNumber"
                                            >
                                                4.7
                                            </span>
                                        </span>
                                        <p>(1 rating)</p>
                                    </div>
                                    <p className="font-bold text-3xl my-3">
                                        Rp{product.price}
                                    </p>
                                    <hr className="w-full  bg-gray-300 border-1/2" />
                                    <p className="text-base my-2 ms-4 font-bold text-[#00AA5B]">
                                        Detail
                                    </p>
                                    <hr className="w-full  bg-gray-300 border-1/2" />
                                    <div className="my-3 text-gray-500 flex flex-col gap-2">
                                        <p>
                                            Kondisi:{" "}
                                            <span className="text-black">
                                                Baru
                                            </span>
                                        </p>
                                        <p>
                                            Min. Pemesanan:{" "}
                                            <span className="text-black">
                                                1 Buah
                                            </span>
                                        </p>
                                        <p>
                                            Etalase:{" "}
                                            <span className="text-[#00AA5B] font-bold">
                                                Lampu Gantung
                                            </span>
                                        </p>
                                        <p className="text-black pr-5 font-thin">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-[27%] flex justify-end">
                                    <div className="px-3 border border-gray-300 rounded-md w-[268px] h-min">
                                        <p className="font-bold mt-[12px] mb-[20px]">
                                            Atur jumlah dan catatan
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="  border border-gray-300 rounded-md flex px-3 w-min py-1">
                                                <button
                                                    aria-label="Kurangi 1"
                                                    className="css-6cobzs"
                                                    tabIndex={-1}
                                                >
                                                    <svg
                                                        className="unf-icon"
                                                        viewBox="0 0 24 24"
                                                        width="16px"
                                                        height="16px"
                                                        fill="var(--NN300, #BFC9D9)"
                                                        style={{
                                                            display:
                                                                "inline-block",
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    >
                                                        <path d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5Z" />
                                                    </svg>
                                                </button>
                                                <input
                                                    id="qty-editor-atc"
                                                    aria-valuenow={1}
                                                    aria-valuemin={1}
                                                    aria-valuemax={1}
                                                    className="text-center w-12"
                                                    data-unify="QuantityEditor"
                                                    role="spinbutton"
                                                    type="text"
                                                    defaultValue={1}
                                                />
                                                <button
                                                    aria-label="Tambah 1"
                                                    className="css-6cobzs"
                                                    tabIndex={-1}
                                                >
                                                    <svg
                                                        className="unf-icon"
                                                        viewBox="0 0 24 24"
                                                        width="16px"
                                                        height="16px"
                                                        fill="var(--NN300, #BFC9D9)"
                                                        style={{
                                                            display:
                                                                "inline-block",
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    >
                                                        <path d="M20 11.25h-7.25V4a.75.75 0 1 0-1.5 0v7.25H4a.75.75 0 1 0 0 1.5h7.25V20a.75.75 0 1 0 1.5 0v-7.25H20a.75.75 0 1 0 0-1.5Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-sm font-thin">
                                                Stok Total:{" "}
                                                <span className="text-sm font-bold text-orange-500">
                                                    Sisa 1
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center content-center mb-1 mt-4">
                                            <p className="text-sm text-gray-500">
                                                Subtotal
                                            </p>
                                            <p className="text-lg font-bold">
                                                Rp{product.price}
                                            </p>
                                        </div>
                                        <button className="my-[8px] bg-[#00AA5B] rounded-md px-[16px] hover:cursor-pointer h-[40px] w-full">
                                            <p className="text-white font-bold">
                                                + Keranjang
                                            </p>
                                        </button>
                                        <button className="rounded-md border border-[#00AA5B] px-[16px] hover:cursor-pointer h-[40px] w-full">
                                            <p className="text-[#00AA5B] font-bold">
                                                Beli Langsung
                                            </p>
                                        </button>
                                        <div className="grid grid-cols-3 py-[16px]">
                                            <p className="hover:cursor-pointer text-xs font-bold text-center">
                                                Chat
                                            </p>
                                            <WishListAddButton2
                                                productId={String(product._id)}
                                            />
                                            <p className="hover:cursor-pointer text-xs font-bold text-center">
                                                Share
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="w-full  bg-gray-300 border-1/2" />
                        <p className="text-2xl font-bold my-5">
                            Lainnya di toko ini
                        </p>
                        <InfinityProducts />
                    </div>
                </div>
            </div>
        </div>
    );
}
