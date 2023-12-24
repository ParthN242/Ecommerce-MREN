import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Cart/Payment";
const StripeRoute = ({ stripeApiKey }) => {
  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment path="/process/payment" Component={Payment} />
    </Elements>
  );
};

export default StripeRoute;
