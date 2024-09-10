import database from "../config/mongodb";
import { ProductType } from "@/type";

class ProductModel {
    static collection() {
        return database.collection<ProductType>("products");
    }

    static async getAll(offset: number = 0, limit: number = 20) {
        const products = await this.collection()
            .find()
            .skip(offset)
            .limit(limit)
            .toArray();
        return products;
    }

    static async getBySlug(slug: string) {
        const product = await this.collection().findOne({ slug: slug });
        if (!product) {
            let error = new Error();
            error.message = "NotFound";
            throw error;
        }
        return product;
    }

    static async search(query: string) {
        const regex = new RegExp(query, "i");
        const products = await this.collection()
            .find({
                name: { $regex: regex },
            })
            .toArray();
        return products;
    }
}

export default ProductModel;
