
import { useEffect } from "react";
import isUserAuth from "../Utils/helpers";
import PropTypes from 'prop-types';
import Cart from "./Cart";
import { NavLink } from "react-router-dom";

function NavContainer({ cartItem, setCartItem }) {

    const handleCartItem = () => {
        setCartItem(prevCartItem => prevCartItem + 1);
        console.log(`Cart Items are:${cartItem}`);

    }



    /*useEffect(() => {
        if (isUserAuth() && Cart) {
            handleCartItem();
        }
    });*/

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/products">
                    <img src="src/assets/Images/Company_logo.png"
                        alt="logo"
                        className="img-rounded-circle"
                        width="80"
                        height="60" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/products">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/products/about">About</NavLink>
                        </li>

                        {isUserAuth() && Cart ? (<li className="nav-item">
                            <NavLink className="nav-link" to="/products/cart">Cart
                                <i className="fa fa-shopping-cart">
                                    <span style={{ padding: "4px", margin: "1.5px" }}
                                        className="badge rounded-pill text-bg-danger"
                                        onChange={(e) => { handleCartItem(e) }}
                                    >
                                        {cartItem}
                                    </span>
                                </i>
                            </NavLink>
                        </li>) : ''}

                        {isUserAuth() ? (<li className="nav-item">
                            <NavLink className="nav-link" href="/Checkout/Wishlist">
                                Wishlist</NavLink>
                        </li>) : ''}

                        {isUserAuth() ? (
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle text-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user"></i>&nbsp;Profile
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item text-danger" to="/Login"
                                        onClick={() => {
                                            localStorage.removeItem('cart');
                                            localStorage.removeItem('airtribe-customer-wishlist');
                                            localStorage.removeItem('Customer');
                                            window.location.href = '/Login';
                                        }}
                                    >
                                        <i className="fa fa-power-off"></i>
                                        Logout</NavLink></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-info" onClick={() => {
                                    window.location.href = '/Login';
                                }}>
                                    <i className="fa fa-lock"></i> Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

NavContainer.propTypes = {
    cartItem: PropTypes.number.isRequired,
    setCartItem: PropTypes.func.isRequired,
};

export default NavContainer;
