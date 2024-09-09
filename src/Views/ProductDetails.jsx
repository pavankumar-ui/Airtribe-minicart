import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import isUserAuth from "../Utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import { LoadingOverlay } from "@mantine/core";


function ProductDetails() {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { productid } = useParams();


    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"

        })

        const fetchProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.in/api/products/${productid}`);
            const data = await response.json();
            setProduct(data.product);
            console.log(data.product);
            setLoading(false);
        }
        fetchProduct();
    }, [productid, product]);


    useEffect(() => {
        setLoading(true);
    }, []);

    const handleAddtoCart = (e) => {

        e.stopPropagation();
        if (!isUserAuth()) {
            toast.error("You are not authenticated to add to cart, please login", {
                position: "top-right",
            });
            return null;
        }
    }


    return (

        (!loading ? <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} /> :

            (
                <div className="container-fluid py-3 mt-5" >
                    <ToastContainer />
                    <h2 className="text-primary">Product Details</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                                {product ? <img src={product.image} className="img-fluid" height="650" width="650" /> : null}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-primary">{product?.title}</h3>
                            <br></br>
                            <div className="d-grid gap-3 d-md-flex justify-content-md-start">
                                <h2 className="text-primary">Price:</h2> <h2 className="text-secondary"> ${product?.price}</h2>
                            </div>
                            <br></br><hr></hr>
                            <h3 className="text-primary">Product Description</h3>
                            <p className="text-secondary">{product?.description}</p>

                            <hr></hr><br></br>

                            <div className="d-grid gap-3 d-md-flex justify-content-md-start">
                                <button className="btn btn-primary me-sm-2"
                                    type="button" onClick={(e) => handleAddtoCart(e)} >
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        )



    );
}

export default ProductDetails;