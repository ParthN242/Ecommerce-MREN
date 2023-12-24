import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/Layout/Header/Header.js";
import { useEffect, useState } from "react";
import Footer from "./component/Layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOption from "../src/component/Layout/Header/UserOption.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import StripeRoute from "./component/Route/StripeRoute.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetail from "./component/Order/OrderDetail.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/Layout/Contact/Contact.js";
import About from "./component/Layout/About/About.js";
import NotFound from "./component/Layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getStripeApiKey();
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/contact" Component={Contact} />
          <Route path="/about" Component={About} />
          <Route path="/product/:id" Component={ProductDetails} />
          <Route path="/products" Component={Products} />
          <Route path="/products/:keyword" Component={Products} />
          <Route path="/search" Component={Search} />
          <Route
            path="/account"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route path="/login" Component={LoginSignUp} />
          <Route
            path="/me/update"
            element={<ProtectedRoute Component={UpdateProfile} />}
          />
          <Route
            path="/password/update"
            element={<ProtectedRoute Component={UpdatePassword} />}
          />

          <Route path="/password/forgot" Component={ForgotPassword} />
          <Route path="/password/reset/:token" Component={ResetPassword} />
          <Route path="/cart" Component={Cart} />
          <Route
            path="/shipping"
            element={<ProtectedRoute Component={Shipping} />}
          />
          <Route
            path="/order/confirm"
            element={<ProtectedRoute Component={ConfirmOrder} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute Component={OrderSuccess} />}
          />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <StripeRoute Component={Payment} stripeApiKey={stripeApiKey} />
              }
            />
          )}
          <Route
            path="/orders"
            element={<ProtectedRoute Component={MyOrders} />}
          />
          <Route
            path="/order/detail/:id"
            element={<ProtectedRoute Component={OrderDetail} />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute Component={Dashboard} isAdmin={true} />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute Component={ProductList} isAdmin={true} />}
          />
          <Route
            path="/admin/product"
            element={<ProtectedRoute Component={NewProduct} isAdmin={true} />}
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute Component={UpdateProduct} isAdmin={true} />
            }
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute Component={OrderList} isAdmin={true} />}
          />
          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute Component={ProcessOrder} isAdmin={true} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute Component={UserList} isAdmin={true} />}
          />
          <Route
            path="/admin/user/:id"
            element={<ProtectedRoute Component={UpdateUser} isAdmin={true} />}
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute Component={ProductReviews} isAdmin={true} />
            }
          />
          <Route path="*" Component={NotFound} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;

//  stockhomek11@gmail.com
// 123456789
