import React from "react";
// import ReactStar from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    readOnly: true,
    precision: 0.5,
    style: { color: "tomato" },
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating name="rating" value={review.rating} {...options} />
      <span className="reviewCard-span">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
