import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from 'reactjs-social-login'
import { GoogleLoginButton } from 'react-social-login-buttons'

import '../assets/css/loginStyle.css';

import { login } from "../redux/actions/authActions";

const REACT_APP_GG_APP_ID = '65679218423-r4jlmm8apk41itpck18igdc5g6nba64u.apps.googleusercontent.com'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const token = useSelector(state => state.authReducer.token);
  const message = useSelector(state => state.authReducer.message);

  // Login and set token
  const submitForm = useCallback((email, password) => {
    dispatch(login(email, password));
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
  })

  // Navigate to chat box when user have token
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setTimeout(() => {
        navigate('/');
      })
    }
  }, [sessionStorage.getItem("token")])

  return (
    <>
      <div id="login-container" className="content">
        <div className="flex-div">
          <div className="name-content">
            <h1 className="logo">WinD</h1>
            <p>Connect with friends and the world around you on Facebook.</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            submitForm(email, password);
          }}>
            <input type="text" placeholder="Email or Phone Number" required={true} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required={true} onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="Log in" className="login" />
            <LoginSocialGoogle
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
              <GoogleLoginButton style={{ fontSize: '16px', width: '345px', margin: '0px' }} />
            </LoginSocialGoogle>
            <a href="#">Forgot Password ?</a>
            <hr />
            <Link className="create-account" to="/register">Create New Account</Link>
          </form>
        </div>
      </div>
    </>
  )

}
