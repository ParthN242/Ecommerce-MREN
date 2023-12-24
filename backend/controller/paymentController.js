import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
  res.status(200).json({ client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
