import ProductModel from "@/db/models/Product";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const product = await ProductModel.getBySlug(slug);
        return Response.json(product);
    } catch (error: any) {
        if (error.message === "NotFound")
            return Response.json({ msg: "Not Found" }, { status: 404 });
        return Response.json({ msg: "internal server error" }, { status: 500 });
    }
}
