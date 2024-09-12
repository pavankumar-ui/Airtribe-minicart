import { useNavigate } from "react-router-dom";
import Carouselcomponent from "./Carouselcomponent";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isUserAuth from "../Utils/helpers";
import { Pagination, Badge, Group, Space, Select, Button, LoadingOverlay } from '@mantine/core';
import { Link } from "react-router-dom";

const Home = () => {

    const wishlist = JSON.parse(localStorage.getItem("airtribe-customer-wishlist")) || [];
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [wishlistState, setWishlist] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isProductAddedToCart, setIsProductAddedToCart] = useState({});


    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                let STOREURL = `https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`;
                const data = await fetch(STOREURL);
                const Datajson = await data.json();
                console.log(Datajson.products);
                setProducts(Datajson.products);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchProducts();
        setProducts(products);
    }, [activePage, limit]);

    useEffect(() => {
        setWishlist(wishlist);
    }, [wishlist]);


    useEffect(() => {
        setLoading(true);
    }, []);





    console.log(isProductAddedToCart);
    useEffect(() => {


        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);


        // Initialize isProductAddedToCart state
        const productStatus = savedCart.reduce((acc, item) => {
            acc[item.id] = true;
            return acc;
        }, {});
        setIsProductAddedToCart(productStatus);
    }, []);


    //initial handling of add to cart in terms of authentication//
    const handleAddtoCart = (e, product) => {
        if (!isUserAuth()) {
            toast.error("Please login to add to cart");
            //navigate("/login");
            return;
        }


        e.stopPropagation();

        console.log(product);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const isProductAddedToCart = cart.find((item) => item.id === product.id);

        if (isProductAddedToCart) {
            const updateCart = cart.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });

            localStorage.setItem("cart", JSON.stringify(updateCart));
            setCart(updateCart);
        } else {
            const newCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        }
        toast.success("Product Added to Cart", {
            position: "top-right",
        });

        setIsProductAddedToCart((prevState) => ({
            ...prevState,
            [product.id]: true,
        }));
    };


    const handleWishlist = (e, product) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            toast.error("You are not authenticated to wishlist, please login", {
                position: "top-right",
            });
            return null;
        }

        const wishlist = JSON.parse(localStorage.getItem('airtribe-customer-wishlist'));
        if (!wishlist) {
            let wishListnew = [];
            wishListnew.push(product);
            localStorage.setItem("airtribe-customer-wishlist", JSON.stringify(wishListnew));
            toast.success('product Added to Wishlist',
                { position: "top-right", });
            return true;
        }

        //for checking the existense of the wishlist array and adding the element  to the array//
        if (wishlist.length) {
            const modifiedWishlist = [...wishlist];
            modifiedWishlist.push(product);
            localStorage.setItem('airtribe-customer-wishlist', JSON.stringify(modifiedWishlist));

            toast.success('product Added to Wishlist', {
                position: "top-right",
            });
        }

        return true;
    }

    return (
        <div className="container-fluid">
            <ToastContainer />
            <Carouselcomponent />
            <br></br>

            {loading ? (
                <div className="text-center">
                    <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                </div>
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
                        style={{ backgroundColor: 'whitesmoke' }}>
                        {products && products.length > 0 ?
                            products.map(product => (
                                <div key={product.id} className="col">
                                    <div className="card h-100">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="img-fluid"
                                            style={{ objectFit: 'contain', height: '500px', cursor: 'pointer' }}
                                            onClick={() => navigate(`/Products/${product.id}`
                                                , { preventScrollReset: false })} />
                                        <div className="card-body d-flex flex-column">
                                            <h6
                                                className="card-title"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => navigate(`/Home/${product.id}`, { preventScrollReset: false })}
                                            >
                                                {product.title}
                                            </h6>

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <Badge color="slateblue">{product.category}</Badge>
                                                </div>
                                                <div className="col">
                                                    <h5 className="text-success mb-0">${Math.ceil(product.price)}</h5>
                                                </div>
                                            </div>
                                            <div className="mt-2">



                                                {console.log(cart)}
                                                <button
                                                    className="btn btn-primary btn-md me-2"
                                                    onClick={(e) => handleAddtoCart(e, product)}
                                                    disabled={isProductAddedToCart[product.id]}
                                                >
                                                    <i className="fa fa-shopping-cart"></i>
                                                    {cart?.find(item => item.id === product.id)
                                                        ? 'Added to cart' : 'Add To Cart'}
                                                </button>



                                                <Button
                                                    onClick={(e) => handleWishlist(e, product)}
                                                    color="red"
                                                    Width="sm"

                                                    disabled={wishlistState.find(item => item.id === product.id)}>
                                                    <i className="fa fa-heart"></i>
                                                    &nbsp;
                                                    {wishlistState.find(item => item.id === product.id) ? 'Wishlisted' : 'Wishlist'}
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : null
                        }
                    </div>
                    <br></br>
                    {/*pagination*/}
                    <Group gap={5} justify="center">
                        <Pagination value={activePage} onChange={setActivePage} total={Math.ceil(500 / limit)} />
                        <Select
                            value={limit.toString()}
                            onChange={(value) => setLimit(Number(value))}
                            placeholder="Set Limit"
                            data={['10', '20', '30', '40', '50']}
                        />
                    </Group>
                    <Space h="xl" />
                </>
            )}
            {cart ? '' : <navigate to={'/cart'} />}
        </div>

    );
}
export default Home;
