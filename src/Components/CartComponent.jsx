import { Group, NumberInput, Button, Space } from "@mantine/core";
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";

function CartComponent({ carts, setIncreaseQty, setDecreaseQty, removeProduct, total }) {




    function shortenTitle(title, maxWords = 5) {
        return title?.split(' ').slice(0, maxWords).join(' ') || '';
    }



    return (
        <div className="container mt-5">
            <ToastContainer />
            {carts?.length === 0 ? (
                <h1 className="text-center text-primary">Cart is empty</h1>
            ) : (
                <div className="col-md-12">
                    <div className="bg-white px-5 py-1">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                            <h1 className="fw-semibold fs-2">Cart List</h1>
                            <h2 className="fw-semibold fs-2">{carts.length} Items</h2>
                        </div>
                        <div className="d-flex flex-wrap mt-10 mb-5">
                            <h3 className="fw-semibold text-secondary text-uppercase w-40 fs-6">
                                Product Details
                            </h3> &nbsp;&nbsp;
                            <h3 className="fw-semibold text-center text-secondary text-uppercase w-20 fs-6">
                                Quantity
                            </h3>&nbsp;&nbsp;
                            <h3 className="fw-semibold text-center text-secondary text-uppercase w-20 fs-6">
                                Price
                            </h3>&nbsp;&nbsp;
                            <h3 className="fw-semibold text-center text-secondary text-uppercase w-20 fs-6">
                                Total
                            </h3>&nbsp;&nbsp;
                        </div>
                        {carts?.map((cart) => {
                            return (
                                <div key={cart.id} className="d-flex align-items-center hover-shadow-sm -mx-8 px-3 py-3">
                                    <div className="d-flex w-40">
                                        <div className="w-50">
                                            <img className="h-100" width="280" src={cart?.image} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-between ms-3">
                                            <span className="fw-bold small">
                                                {shortenTitle(cart?.title, 5)}
                                            </span>
                                            <span className="text-danger text-capitalize small">
                                                {cart?.category}
                                            </span>
                                            <div
                                                className="fw-semibold text-danger  small cursor-pointer"
                                                onClick={() => removeProduct(cart?.id)}
                                            >
                                                Remove
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center w-20">
                                        <Space h="xl" />
                                        <Group justify="stretch" align="center" gap={5}>
                                            <Button onClick={(e) => setIncreaseQty(e, cart?.id)}>+</Button>
                                            <NumberInput value={cart.quantity} readOnly />
                                            <Button onClick={(e) => setDecreaseQty(e, cart?.id)}>-</Button>
                                        </Group>

                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    <span className="text-center w-20 fw-semibold small">
                                        ${cart?.price}
                                    </span> &nbsp;&nbsp;
                                    <span className="text-center w-20 fw-semibold small">
                                        ${(cart?.price * cart?.quantity).toFixed(2)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <Link
                to={"/Home"}
                className="btn btn-primary  btn-block text-uppercase"
            >
                Continue Shopping
            </Link>

            {carts?.length === 0 ? '' :
                (<div id="summary" className="col-md-6 p-4 container">
                    <h1 className="font-weight-semibold h4 border-bottom pb-4">Order Summary</h1>
                    <div className="mt-4 row justify-content-between">
                        <span className="font-weight-semibold text-uppercase">
                            Items {carts?.length}
                        </span>
                        <span className="font-weight-semibold">$ {total?.toFixed(2)}</span>
                    </div>


                    <div className="border-top mt-4">
                        <div className="d-flex justify-content-between font-weight-semibold py-3 text-uppercase">
                            <span>Total cost</span>
                            <span>$ {total.toFixed(2)}</span>
                        </div>
                        <Link
                            to="/Cart/checkout"
                            className="btn btn-primary btn-block text-uppercase"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>)}

        </div>
    );
}

CartComponent.propTypes = {
    carts: PropTypes.array.isRequired,
    setIncreaseQty: PropTypes.func.isRequired,
    setDecreaseQty: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};



export default CartComponent;
