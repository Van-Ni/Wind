import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from 'reactjs-social-login'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import '../assets/css/loginStyle.css';
import Validator from '../assets/js/validator';

import { login } from "../redux/actions/authActions";

const REACT_APP_GG_APP_ID = '65679218423-r4jlmm8apk41itpck18igdc5g6nba64u.apps.googleusercontent.com'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.authReducer.token);
  const message = useSelector(state => state.authReducer.message);
  const userId = useSelector(state => state.authReducer.userId);
  const status = useSelector(state => state.authReducer.status)

  // Login
  useEffect(() => {
    var form = new Validator('#login-form')
    form.onSubmit = function (data) {
      dispatch(login(data.email, data.password))
      sessionStorage.setItem("email", data.email);
    }
  }, [])

  // Set token and navigate to friends list
  useEffect(() => {
    if (status == "success") {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      navigate("/friend");
    }
  }, [status, navigate])

  // Auto navigate to chat when token is exist in session
  useEffect(() => {
    if (sessionStorage.getItem("token"))
      navigate("/");
  }, [navigate])

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message, navigate]);

  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_CENTER} style={{ fontSize: "16px" }} />
      <div id="login-container" className="content">
        <div className="flex-div">
          <div className="name-content">
            <h1 className="logo">WinD</h1>
            <p>Connect with friends and the world around you on WinD.</p>
          </div>
          <form id="login-form" method="POST" action="">
            <div className="form-group">
              <input id="email" name="email" type="text" className="form-control" placeholder="Email" rules="required|email" />
              <span className="form-message"></span>
            </div>
            <div className="form-group">
              <input id="password" name="password" type="password" className="form-control" placeholder="Password" rules="required|min:6" />
              <span className="form-message"></span>
            </div>
            <input type="submit" value="Log in" className="login form-submit" />
            {/* <LoginSocialGoogle
              scope={'email'}
              client_id={REACT_APP_GG_APP_ID || ''}
              onResolve={({ provider, data }) => {
                console.log(data)
                // sessionStorage.setItem('email',JSON.stringify(data));
                // dispatch(loginWithEmail(data.email))
              }}
              onReject={(err) => {
              }}
            >
              <GoogleLoginButton style={{ fontSize: '16px', width: '345px', margin: '8px 0px 0px 0px' }} />
            </LoginSocialGoogle> */}
            <a href="#">Forgot Password ?</a>
            <hr />
            <Link className="create-account" to="/register">Create New Account</Link>
          </form>
        </div>
      </div>
    </>
  )

}
