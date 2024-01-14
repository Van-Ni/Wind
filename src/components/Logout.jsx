import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    window.location.reload()
  };
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 2px 0;
  border-radius: 0.5rem;
  background-color: red;
  border: none;
  cursor: pointer;
  svg {
    font-size: 16px;
    color: #ebe7ff;
  }
`;
