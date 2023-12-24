import React, { Fragment, useEffect } from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader.js";
import "./profile.css";

const Profile = () => {
  const history = useNavigate();
  const {
    user,
    loading = true,
    isAuthenticated,
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      history("/login");
    }
  }, [isAuthenticated, history]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name} -- ECOMMERCE`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Join At</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
