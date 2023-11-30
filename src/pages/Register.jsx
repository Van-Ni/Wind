import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../redux/actions/authActions";

import "react-toastify/dist/ReactToastify.css";
import '../assets/css/registerStyle.css';
import Validator from "../assets/js/validator";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.authReducer.message);

  useEffect(() => {
    var form = new Validator('#register-form')
    form.onSubmit = function (data) {
      dispatch(register(data.firstname, data.lastname, data.email, data.password));
    }
  }, [])

  useEffect(() => {
    if (message === "Email already in use, Please login.") {
      toast.error(message);
    } else if (message === "Registration Success.") {
      toast.success(message);
      // Điều hướng đến trang đăng nhập 
      navigate('/login');
    }
  }, [message, navigate]);



  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_CENTER} style={{ fontSize: "16px" }} />
      <div id="register-container" className="content">
        <div className="flex-div">
          <div className="name-content">
            <h1 className="logo">WinD</h1>
            <p>Connect with friends and the world around you on WinD.</p>
          </div>
          <form id="register-form">
            <div className="form-group">
              <input
                id="firstname"
                className="form-control"
                name="firstname"
                type="text"
                placeholder="First Name"
                rules="required"
              />
              <span className="form-message"></span>
            </div>
            <div className="form-group">
              <input
                id="lastname"
                className="form-control"
                name="lastname"
                type="text"
                placeholder="Last Name"
                rules="required"

              />
              <span className="form-message"></span>
            </div>
            <div className="form-group">
              <input
                id="email"
                className="form-control"

                name="email"
                type="email"
                placeholder="Email"
                rules="required|email"
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <input
                id="password"
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
                rules="required|min:6"
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group">
              <input
                id="confirm-password"
                className="form-control"
                name="confirm-password"
                type="password"
                placeholder="Confirm Password"
                rules="required|confirmed"
              />
              <span className="form-message"></span>
            </div>


            <input type="submit" value="Register" className="login" />
            <hr />
            <Link to="/login">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
