import React, { Fragment, useEffect } from "react";
import MetaData from "../Layout/MetaData.js";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ConfirmOrder.css";
import Loader from "../Layout/Loader/Loader.js";
import { clearErrors } from "../../actions/userAction.js";

const ConfirmOrder = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharge + tax;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history("/process/payment");
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  });
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Confirm Order" />
          <CheckoutSteps activeStep={1} />
          <div className="confirmOrderaPage">
            <div>
              <div className="confirmShippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmShippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{shippingInfo.address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt={item.name} />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.quantity * item.price}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography>Order Summary</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charge:</p>
                    <span>₹{shippingCharge}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>
                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>
                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
