import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'

import store from "./redux/store";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profiles from "./pages/profiles/Profiles";
import EditProfiles from "./pages/profiles/EditProfiles"



export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/editprofiles" element={<EditProfiles />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
