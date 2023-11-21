import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Request from "./components/Friend/Request";
import Suggest from "./components/Friend/Suggest";
import Friend from "./components/Friend/Friend";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/friend/request" element={<Request />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/friend/suggest" element={<Suggest />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
