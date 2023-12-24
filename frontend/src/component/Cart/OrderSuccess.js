import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order Has Been Placed Successfully.</Typography>
      <Link to="/orders">View Order</Link>
    </div>
  );
};

export default OrderSuccess;
