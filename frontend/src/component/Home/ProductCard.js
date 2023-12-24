import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    readOnly: true,
    precision: 0.5,
    style: { color: "tomato" },
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating value={product.ratings} {...options} />{" "}
        <span className="productCard-span">
          ({product.numOfReviews} reviews)
        </span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default ProductCard;
