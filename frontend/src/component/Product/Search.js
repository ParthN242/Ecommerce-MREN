import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import MetaData from "../Layout/MetaData";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title={`Search A Product -- ECOMMERCE`} />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </Fragment>
  );
};

export default Search;
