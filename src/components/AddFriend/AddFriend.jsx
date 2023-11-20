import React, { useState } from "react";
import "./style.css";
import IconRq from "../../assets/img/frrq-icon.jpg";
import IconAll from "../../assets/img/allicon.jpg";
import Iconsugesst from "../../assets/img/suggesticon.jpg";
import Homebutton from "../../assets/img/home.jpg";
import FriendIcon from "../../assets/img/userbutton.jpg";
import MsgIcon from "../../assets/img/msg.jpg";
import NofiIcon from "../../assets/img/nofi.jpg";
import MenuIcon from "../../assets/img/menu.jpg";
import AvtIcon from "../../assets/img/avt.jpg";

function AddFriend() {
  const [friends, setFriends] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddFriend = () => {
    if (inputValue.trim() !== "") {
      setFriends([...friends, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div id="addfriend-container" className="container">
      <div className="top-menu">
        <div className="logo-icon">
          <a className="text-icon">
            <h2 className="text-h2">W</h2>
          </a>
        </div>
        <div className="search-bar">
          <input></input>
        </div>
        <div className="button-container">
          <a href="./" className="home-button">
            <img className="img-icon" src={Homebutton} alt="logo" />
          </a>
          <a href="./addfriend" className="home-button">
            <img className="img-icon" src={FriendIcon} alt="logo" />
          </a>
        </div>
        <div className="button-container1">
          <a href="./" className="home-button">
            <img className="img-icon" src={MenuIcon} alt="logo" />
          </a>
          <a href="./addfriend" className="home-button">
            <img className="img-icon" src={MsgIcon} alt="logo" />
          </a>
          <a href="./" className="home-button">
            <img className="img-icon" src={NofiIcon} alt="logo" />
          </a>
          <a href="./addfriend" className="home-button">
            <img className="img-icon" src={AvtIcon} alt="logo" />
          </a>
        </div>
      </div>
      <div className="left-sidebar">
        <h2>Friends</h2>
        <ul>
          <li>
            <img className="img-icon" src={IconRq} alt="logo" />
            Friend Request
          </li>
          <li>
            <img className="img-icon" src={Iconsugesst} alt="logo" />
            <a href="./">Suggest</a>
          </li>
          <li>
            <img className="img-icon" src={IconAll} alt="logo" />
            All Friends
          </li>
        </ul>
      </div>

      <div className="content">
        <h1 className="text-frrq">Friend Request </h1>
        <div className="container-card">
          <div className="card">
            <div className="image">
              <img
                className="image"
                src="https://www.gannett-cdn.com/presto/2020/08/25/USAT/842737a0-5b6c-47bc-adbc-ea5bef879661-Messi_gone.jpg"
              />
            </div>

            <div className="text-name">Messi</div>
            <div className="button">
              <button>Add Friend</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
