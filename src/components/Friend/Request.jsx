import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import DefaultAvt from "../../assets/img/default.jpg"

function Request() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = () => {
    sessionStorage.removeItem("token");
    navigate('/login');
  };
  const displayedFRRS = useMemo(() => {
    // Kiểm tra nếu friendrequest không phải là một mảng
    if (!Array.isArray(friendrequest)) {
      return []; // Trả về một mảng rỗng hoặc giá trị mặc định tương ứng
    }
    
    // Tính toán danh sách sản phẩm hiển thị trên trang
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return friendrequest.slice(startIndex, endIndex);
  }, [friendrequest]);
 



  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/login");
      });
    }
  }, [sessionStorage.getItem("token")]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      setTimeout(() => {
        navigate("/login");
      });
    } else {
      fetch("https://wind-be.onrender.com/user/get-requests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
         
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success' && data.data.length > 0) {
            const { sender } = data.data[0];
            const { firstName, lastName, _id } = sender;
         
            // Update state or do other actions with the data
            setFriendrequest(data.data);
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);



  const { firstName, lastName, _id } = displayedFRRS[0]?.sender || {};
  
  return (
   <>
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
          <a href="./" className="home-button">
            <img className="img-icon" src={FriendIcon} alt="logo" />
          </a>
        </div>
        <div className="button-container1">
          <a href="#" className="home-button">
            <img className="img-icon" src={MenuIcon} alt="logo" />
          </a>
          <a href="/" className="home-button">
            <img className="img-icon" src={MsgIcon} alt="logo" />
          </a>
          <a href="#" className="home-button">
            <img className="img-icon" src={NofiIcon} alt="logo" />
          </a>
          <div className="dropdown">
      <a href="#" className="home-button" onClick={handleDropdownToggle}>
        <img className="img-icon" src={AvtIcon} alt="logo" />
      </a>
      {showDropdown && (
        <div className="dropdown-content">
          <a href="#" >
            Infomation
          </a>
          <br/>
          <a href="#" onClick={() => handleOptionClick()}>
            SignOut
          </a>
        </div>
      )}
    </div>
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
            <a href="./suggest">Suggest</a>
          </li>
          <li>
            <img className="img-icon" src={IconAll} alt="logo" />
            <a href="./"> All Friends</a>
          </li>
        </ul>
      </div>

      <div className="content">
        <h1 className="text-frrq">Friend Request </h1>
        {/* <div className="ui grid container">
        {displayedProducts.map((friendrequest) => {
          const { id, firstName  , lastName} =
          friendrequest;

          return (
            <div className="four wide column" key={id}>
              <a href={`/friend:${id}`}>
                <div className="ui link cards">
                  <div className="card">
                    <div className="image">
                      <img src={"DefaultAvt"} />
                    </div>
                    <div className="content">
                      <div className="header">{firstName+ lastName}</div>
                     
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div> */}
        <div className="container-card">
    {displayedFRRS.map((request, index) => {
      const { sender } = request;
      const { firstName, lastName, _id } = sender;

      return (
        <div className="four-wide-column" key={_id}>
        <div className="card" key={index}>
          <div className="image">
            <img className="image" src={DefaultAvt} alt={`Avatar_${_id}`} />
          </div>
          <div className="text-name">{`${firstName} ${lastName}`}</div>
          <div className="button">
            <button>Accept</button>
            <button>Delete</button>
          </div>
        </div>
        </div>
      );
    })}
    </div>
      </div>
    </div>
    </>
  );
}

export default Request;
