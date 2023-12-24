import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductsDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader.js";
// import ReactStar from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstant.js";
import "./productDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const alert = useAlert();
  const {
    product,
    error,
    loading = true,
  } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantiy = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };
  const increaseQuantiy = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const addTocartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };
  const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
    style: { color: "tomato" },
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductsDetails(params.id));
    if (reviewError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name.toUpperCase()} -- ECOMMERCE`} />
          <div className="productDetails">
            <div className="productImages">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item._id}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="productTextDetails">
              <div className="detailBlock-1">
                <h2>{product.name.toUpperCase()}</h2>
                <p>#Product {product._id}</p>
              </div>
              <div className="detailBlock-2">
                <Rating value={product.ratings} {...options} />
                <span className="detailBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailBlock-3">
                <h1>₹{product.price}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button onClick={decreaseQuantiy}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantiy}>+</button>
                  </div>

                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addTocartHandler}
                  >
                    Add To Cart
                  </button>
                </div>

                <p>
                  Status:{""}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating onChange={(e) => setRating(e.target.value)} />
              <textarea
                className="submitDialogTextArea"
                rows={5}
                cols={30}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((rewview) => (
                <ReviewCard key={rewview._id} review={rewview} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Review Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
