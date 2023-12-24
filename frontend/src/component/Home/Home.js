import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import MetaData from "../Layout/MetaData.js";
import { clearErrors, getProducts } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import "./home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="homeHaeding ">Feature Product</div>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
