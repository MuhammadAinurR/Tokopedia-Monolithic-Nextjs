import ProductModel from "@/db/models/Product";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const offset = parseInt(url.searchParams.get("offset") || "0", 10);
        const limit = parseInt(url.searchParams.get("limit") || "20", 10);

        const products = await ProductModel.getAll(offset, limit);
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ msg: "internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
