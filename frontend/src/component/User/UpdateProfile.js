import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction.js";
import MailOutLineIcon from "@material-ui/icons/MailOutline.js";
import FaceIcon from "@material-ui/icons/Face.js";
import Loader from "../Layout/Loader/Loader.js";
import "./updateProfile.css";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant.js";
import MetaData from "../Layout/MetaData.js";

const UpdateProfile = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading = true } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [error, alert, dispatch, history, isUpdated, user]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Profile"} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h1 className="updateProfileHeading">Update Profile</h1>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutLineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <button
                  type="submit"
                  className="updateProfileBtn"
                  disabled={loading ? true : false}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
