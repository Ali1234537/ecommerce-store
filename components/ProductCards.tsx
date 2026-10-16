"use client";
import Image from "next/image";
import Link from "next/link";
import Product from "@/types/type";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { addToCart, } from "@/redux/features/cart/cartSlice";

type Typed = {
    product: Product;
}

function ProductCard({ product }: Typed) {
    const router = useRouter();

    const products = useAppSelector((state) => state.product.Products);

    const currentProduct = products.find((item) => item.id === product.id);

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    return (
        <div
            onClick={() => router.push(`/details?id=${product.id}`)}
            className="w-72 h bg-red-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all p-4 m-4 flex flex-col cursor-pointer">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-48 object-cover mb-4 " />
            <h2 className="text-lg font-semibold mb-2 text-black text-center">{product.name}</h2>

            <p className="text-gray-800 mb-2">Price: ${product.price}</p>
            <p className="text-gray-800 mb-2">Stock: {currentProduct?.stock ?? product.stock}</p>
            <p className="text-gray-800 mb-2">Category: {product.category}</p>
            <p className="text-gray-800 mb-4">{product.detail}</p>

            <Link href={`/details?id=${product.id}`} className="block w-fit mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6 ">
                View Details
            </Link>
            <button onClick={() => { dispatch(addToCart(product)); alert("Product added to cart!") }}
                className="mt-6 rounded bg-gray-700 px-5 py-3 text-white hover:bg-gray-800 cursor-pointer">
                Add to cart
            </button>
        </div>
    );
}

export default ProductCard;