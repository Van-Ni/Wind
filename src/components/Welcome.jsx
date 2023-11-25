import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(undefined);

  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("email")) {
      setUserEmail(sessionStorage.getItem("email"))
    } 
  }, [])

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userEmail}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  font-size: 2.2rem;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
    font-size: 2.2rem;
  }
`;
