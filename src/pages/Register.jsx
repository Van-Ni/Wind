import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import '../assets/css/registerStyle.css';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const message = useSelector(state => state.authReducer.message);


  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(message);
      return;
    }
    dispatch(register(firstName, lastName, email, password,confirmPassword));
  };
  useEffect(() => {
    if (message ==="Email already in use, Please login.") {
      toast.error(message);
    }else if(message ==="Registration Success."){
    toast.success(message);
      // Điều hướng đến trang đăng nhập 
      navigate('/login');}
  }, [message, navigate]);

  

  return (
    <>
    <ToastContainer position={toast.POSITION.TOP_CENTER } style={{ fontSize: "40px" }} />
      <div id="register-container" className="content">
        <div className="flex-div">
          <div className="name-content">
            <h1 className="logo">WinD</h1>
            <p>Connect with friends and the world around you on WinD.</p>
          </div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              required={true}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input type="submit" value="Register" className="login" />
            <hr />
            <Link  to="/login">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
