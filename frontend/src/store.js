import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProducteducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailReducer,
  userReducer,
} from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  allOrderReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "./reducers/orderReducer.js";

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetail: orderDetailReducer,
  newReview: newReviewReducer,
  newProduct: newProducteducer,
  product: productReducer,
  allorders: allOrderReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDatail: userDetailReducer,
  allReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
