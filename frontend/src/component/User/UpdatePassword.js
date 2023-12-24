import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction.js";
import Loader from "../Layout/Loader/Loader.js";
import "./updatePassword.css";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant.js";
import MetaData from "../Layout/MetaData.js";
import LockOpenIcon from "@material-ui/icons/LockOpen.js";
import LockIcon from "@material-ui/icons/Lock.js";
import VpnKeyIcon from "@material-ui/icons/VpnKey.js";

const UpdatePassword = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch(loadUser());
      history("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, alert, dispatch, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h1 className="updatePasswordHeading">Update Password</h1>
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </div>
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>
                <button
                  type="submit"
                  className="updatePasswordBtn"
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

export default UpdatePassword;
