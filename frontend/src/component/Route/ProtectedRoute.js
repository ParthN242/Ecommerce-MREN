import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";

const ProtectedRoute = ({ Component, isAdmin }) => {
  const {
    isAuthenticated,
    user,
    loading = true,
  } = useSelector((state) => state.user);
  const history = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      history("/login");
    }
    if (isAdmin && user && user?.role === "user") {
      history("/login");
    }
  }, [isAuthenticated, history, user, isAdmin]);
  return <>{loading ? <Loader /> : <Component />}</>;
};

export default ProtectedRoute;
