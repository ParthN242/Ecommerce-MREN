import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, register, clearErrors } from "../../actions/userAction.js";
import { useNavigate, useLocation } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen.js";
import MailOutLineIcon from "@material-ui/icons/MailOutline.js";
import FaceIcon from "@material-ui/icons/Face.js";
import Loader from "../Layout/Loader/Loader.js";
import "./loginSignUp.css";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const location = useLocation();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const {
    error,
    loading = true,
    isAuthenticated = false,
  } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

  const { name, email, password } = user;

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history(`/${redirect}`);
    }
  }, [error, alert, dispatch, history, isAuthenticated, redirect]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="loginSignUpContainer">
            <div className="loginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              {/* Login Form */}
              <form
                className="loginForm"
                encType="multipart/form-data"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <MailOutLineIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={loginEmail}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <button type="submit" className="loginBtn">
                  Login
                </button>
              </form>

              {/* Sign Up Form */}

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    onChange={registerDataChange}
                    value={name}
                  />
                </div>
                <div className="signEmail">
                  <MailOutLineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={registerDataChange}
                    value={email}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    onChange={registerDataChange}
                    value={password}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <button
                  type="submit"
                  className="signUpBtn"
                  disabled={loading ? true : false}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default LoginSignUp;
