import { useState } from "react";
import isUserAuth from "../Utils/helpers";


function NavContainer() {



    const [cartItem, setCartItem] = useState(0);


    const handleCartItem = (e) => {
        e.preventDefault();

        if (isUserAuth()) {
            setCartItem(cartItem + 1);
        }
    }

    return (


        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/Home">

                    <img src="src/assets/Images/Company_logo.png"
                        alt="logo"
                        className="img-rounded-circle"
                        width="80"
                        height="60" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/Home/about">About</a>
                        </li>


                        {isUserAuth() ? (<li className="nav-item">
                            <a className="nav-link" href="/Cart">Cart
                                <i className="fa fa-shopping-cart">

                                    <span style={{ padding: "4px", margin: "1.5px" }}
                                        className="badge rounded-pill text-bg-danger"
                                        onChange={(e) => { handleCartItem(e) }}
                                    >
                                        {cartItem}
                                    </span>
                                </i>
                            </a>
                        </li>) : ''}

                        {isUserAuth() ? (<li className="nav-item">
                            <a className="nav-link" href="/Checkout/Wishlist">
                                Wishlist</a>
                        </li>) : ''}

                        {isUserAuth() ? (
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={() => {
                                    localStorage.removeItem('cart');
                                    localStorage.removeItem('airtribe-customer-wishlist');
                                    localStorage.removeItem('Customer');
                                    window.location.href = '/Login';
                                }}>
                                    <i className="fa fa-power-off"></i> Logout
                                </button>
                            </li>) : (<li className="nav-item">
                                <button className="btn btn-info" onClick={() => {
                                    window.location.href = '/Login';
                                }}>
                                    <i className="fa fa-lock"></i> Login
                                </button>
                            </li>)}


                    </ul>
                </div>
            </div>
        </nav>


    );
}
export default NavContainer;