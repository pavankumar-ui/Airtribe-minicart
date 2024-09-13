import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Group, NumberInput, Button } from "@mantine/core";
import { toast, ToastContainer } from "react-toastify";
import isUserAuth from "../Utils/helpers";
import CartComponent from "../Components/CartComponent";
import PrivateRoutes from "../Routers/PrivateRoute";

function Cart() {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [carts, setCarts] = useState(
        () => JSON.parse(localStorage.getItem("cart")) || []
    );

    // Updates total cost when carts change
    useEffect(() => {
        const totalItem = carts.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotal(totalItem);
    }, [carts]);

    const setIncreaseQty = (e, id) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            toast.error("You are not authenticated to add to cart, please login", {
                position: "top-right",
            });
            return;
        }
        const updatedCart = carts.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCarts(updatedCart); // update state
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // sync with localStorage
        console.log(updatedCart);
    };

    const setDecreaseQty = (e, id) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            toast.error("You are not authenticated to add to cart, please login", {
                position: "top-right",
            });
            return;
        }
        const updatedCart = carts.map((item) => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCarts(updatedCart); // update state
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // sync with localStorage
    };

    const removeProduct = (id) => {
        const updatedCart = carts.filter((item) => item.id !== id);
        setCarts(updatedCart); // update state
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // sync with localStorage
    };

    return (
        <>
            <PrivateRoutes />
            <ToastContainer />
            <CartComponent
                carts={carts}
                setIncreaseQty={setIncreaseQty}
                setDecreaseQty={setDecreaseQty}
                removeProduct={removeProduct}
                total={total}
                navigate={navigate}
            />
        </>
    );
}

export default Cart;
