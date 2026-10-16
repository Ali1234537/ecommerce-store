"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { setCart } from "./features/cart/cartSlice";
import { setProducts } from "./features/product/productSlice";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {

    useEffect(() => {
        const savedcart = localStorage.getItem("cart");

        if (savedcart) {
            store.dispatch(setCart(JSON.parse(savedcart)));
        }

        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
            const products = JSON.parse(savedProducts);

            if (products.length > 0) {
                store.dispatch(setProducts(products));
            }
        }

        const notSub = store.subscribe(() => {
            const cartItems = store.getState().cart.items;
            const products = store.getState().product.Products;
            localStorage.setItem(
                "cart",
                JSON.stringify(cartItems)
            );

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );
        });
        return notSub;
    }, [])
    return <Provider store={store}>
        {children}
    </Provider>
}