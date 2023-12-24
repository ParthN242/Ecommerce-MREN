import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, resetPassword } from "../../actions/userAction.js";
import Loader from "../Layout/Loader/Loader.js";
import "./resetPassword.css";
import MetaData from "../Layout/MetaData.js";
import LockOpenIcon from "@material-ui/icons/LockOpen.js";
import LockIcon from "@material-ui/icons/Lock.js";

const ResetPassword = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      history("/login");
    }
  }, [error, alert, dispatch, history, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Reset Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h1 className="resetPasswordHeading">Reset Password</h1>
              <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />

                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>

                <button
                  type="submit"
                  className="resetPasswordBtn"
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

export default ResetPassword;
