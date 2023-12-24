import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, forgotPassword } from "../../actions/userAction.js";
import Loader from "../Layout/Loader/Loader.js";
import "./forgotPassword.css";
import MetaData from "../Layout/MetaData.js";
import MailOutLineIcon from "@material-ui/icons/MailOutline.js";

const ForgotPassword = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, history, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Forgot Password"} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h1 className="forgotPasswordHeading">Forgot Password</h1>
              <form
                className="forgotPasswordForm"
                encType="multipart/form-data"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="loginPassword">
                  <MailOutLineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button
                  type="submit"
                  className="forgotPasswordBtn"
                  disabled={loading ? true : false}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
