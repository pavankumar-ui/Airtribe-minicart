import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Views/Home";
import ProductDetails from "../Views/ProductDetails";
import LoginComponent from "../Views/Login";
import Checkout from "../Views/Checkout";
import AppWrapper from "../AppWrapper";
import PrivateRoutes from "./PrivateRoute";
import Wishlist from "../Views/Wishlist";
import About from "../Views/About";
import Cart from "../Views/Cart";
//import NewCart from "../Views/newcart";


const routes = createBrowserRouter([

    {
        path: "/login",
        element: <LoginComponent />

    },
    {
        path: "/products",
        element: <AppWrapper />,

        children: [

            { // This makes the Home component render at the root "/"

                element: <Home />,
                index: true
            },
            {
                path: "about",
                element: <About />,

            },
            {
                path: ":productid",
                element: <ProductDetails />

            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "Checkout",
                element: <PrivateRoutes><Checkout /></PrivateRoutes>
            },
            {
                path: "Wishlist",
                element: <PrivateRoutes><Wishlist /></PrivateRoutes>
            }


        ]
    }
]);



export default function AppRoutes() {
    return <RouterProvider router={routes} />
}
