import Link from "next/link";
import ListProduct from "./ListProducts";

export default async function FeaturedProduct() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products");
    let products = await res.json();
    products = products.slice(0, 18);

    return (
        <div>
            <div className="flex justify-between items-center mt-7 mb-5">
                <p className="text-xl font-bold">Lagi trending, nih</p>
                <Link href="/products" className="flex gap-1">
                    <svg
                        className="unf-icon"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        fill="var(--GN500, #00AA5B)"
                        style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                        }}
                    >
                        <path d="M18.89 18.89A9.719 9.719 0 0 0 21.75 12a.75.75 0 1 0-1.5 0 8.258 8.258 0 0 1-3.63 6.84l-.55.34-.15.09-.46.22-.29.13-.36.13c-.14.05-.28.11-.42.15l-.24.06-.55.14h-.1a8.292 8.292 0 0 1-3 0h-.1l-.54-.1-.24-.06c-.14 0-.28-.1-.42-.15l-.36-.13-.29-.13-.46-.22-.15-.09-.55-.34a8.28 8.28 0 0 1-3.57-5.89v-.11a7.56 7.56 0 0 1 0-.83 7.497 7.497 0 0 1 0-.82.59.59 0 0 0 0-.13c0-.23.06-.47.11-.69a8.26 8.26 0 0 1 3.42-5.22h.05c.16-.11.34-.21.51-.31.06-.042.123-.08.19-.11l.42-.21.32-.14.33-.12a4 4 0 0 1 .45-.16h.2l.6-.15h.05A8.27 8.27 0 0 1 17 5.44l-1.1 1.1a1 1 0 0 0 .7 1.71h3.15a1 1 0 0 0 1-1V4.1A1 1 0 0 0 19 3.4l-1 1a9.77 9.77 0 0 0-6-2.12 9.81 9.81 0 0 0-2.62.37l-.18.05-.59.2-.33.1-.42.19c-.16.069-.317.145-.47.23-.09 0-.17.1-.26.15-.09.05-.38.22-.57.35L6.47 4a9.6 9.6 0 0 0-4 6c-.06.26-.09.54-.13.81a1 1 0 0 1 0 .16v2a.68.68 0 0 0 0 .14c.029.282.072.563.13.84A9.77 9.77 0 0 0 11 21.69a8.2 8.2 0 0 0 2 0h.06a9.69 9.69 0 0 0 5.83-2.8Z" />
                    </svg>

                    <p className="text-[#00AA5B] font-bold">Muat Lainnya</p>
                </Link>
            </div>
            <ListProduct products={products} />
            <div className="flex justify-center mt-5 mb-10">
                <Link href="products">
                    <button className="border border-green-600 rounded-md px-3 py-1 bg-white hover:cursor-pointer">
                        <p className="text-[#00AA5B] font-bold text-sm">
                            Tampilkan lebih banyak product
                        </p>
                    </button>
                </Link>
            </div>
        </div>
    );
}
