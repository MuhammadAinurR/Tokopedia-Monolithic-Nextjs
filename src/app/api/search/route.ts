import ProductModel from "@/db/models/Product";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    try {
        if (query) {
            const products = await ProductModel.search(query);
            return Response.json(products);
        } else {
            const products = await ProductModel.getAll();
            return Response.json(products);
        }
    } catch (error) {
        return Response.json({ msg: "internal server error" }, { status: 500 });
    }
}
