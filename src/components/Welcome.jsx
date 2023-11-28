import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/img/robot.gif";
export default function Welcome() {
  // const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(undefined);

  // useEffect(async () => {
  //   setUserName(
  //     await JSON.parse(
  //       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //     ).username
  //   );
  // }, []);

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
  font-size: 16px;
  img {
    height: 20rem;
  }
  span {
    color: #fff;
    font-size: 18px;
  }
`;
