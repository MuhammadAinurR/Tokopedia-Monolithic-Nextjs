import { ObjectId } from "mongodb";
import database from "../config/mongodb";

interface WishlistType {
    userId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

class WishlistModel {
    static collection() {
        return database.collection<WishlistType>("wishlists");
    }

    static async create(payload: { userId: string; productId: string }) {
        const newWishlist = {
            userId: new ObjectId(payload.userId),
            productId: new ObjectId(payload.productId),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await this.collection().insertOne(newWishlist);
        return "success add wishlist";
    }

    static async duplicateCheck(userId: string, productId: string) {
        const wishlist = await this.collection().findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });

        return wishlist as WishlistType;
    }

    static async find(userId: string) {
        const agg = [
            {
                $match: {
                    userId: new ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products",
                },
            },
            {
                $unwind: {
                    path: "$products",
                },
            },
            {
                $unset: [
                    "_id",
                    "userId",
                    "productId",
                    "createdAt",
                    "updatedAt",
                ],
            },
            {
                $replaceRoot: {
                    newRoot: "$products",
                },
            },
        ];
        const wishlists = await this.collection().aggregate(agg).toArray();
        return wishlists;
    }

    static async delete(userId: string, productId: string) {
        const result = await this.collection().deleteOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });

        return result.deletedCount === 1
            ? "success delete wishlist"
            : "wishlist not found";
    }
}

export default WishlistModel;
