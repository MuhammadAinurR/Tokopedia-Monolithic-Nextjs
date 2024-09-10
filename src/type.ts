export interface ProductType {
    _id?: Id;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserType {
    _id?: Id;
    email: string;
    username?: string;
    password: string;
}

export interface Id {
    $oid: string;
}
