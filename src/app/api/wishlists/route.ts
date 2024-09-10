import WishlistModel from "@/db/models/Wishlist";

export async function GET(request: Request) {
    const userId: string = request.headers.get("x-id") as string;
    const wishlist = await WishlistModel.find(userId);

    return Response.json(wishlist);
}

export async function POST(request: Request) {
    try {
        const body: { productId: string } = await request.json();
        const userId: string = request.headers.get("x-id") as string;

        const isDuplicate = await WishlistModel.duplicateCheck(
            userId,
            body.productId
        );
        if (isDuplicate)
            return Response.json({
                msg: "Gagal menambahkan wishlist, item sudah ada dalam wishlist",
            });

        await WishlistModel.create({ productId: body.productId, userId });

        return Response.json({
            msg: "Telah berhasil menambahkan wishlist",
        });
    } catch (error) {
        return Response.json(
            { error: "Failed to add wishlist" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const body: { productId: string } = await request.json();
        const userId: string = request.headers.get("x-id") as string;

        const result = await WishlistModel.delete(userId, body.productId);

        return Response.json({
            msg: result,
        });
    } catch (error) {
        return Response.json(
            { error: "Failed to delete wishlist" },
            { status: 500 }
        );
    }
}
