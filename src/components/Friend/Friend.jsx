import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import IconRq from "../../assets/img/frreqindex.jpg";
import IconAll from "../../assets/img/All-icon.jpg";
import Iconsugesst from "../../assets/img/suggesticon.jpg";
import Homebutton from "../../assets/img/home.jpg";
import FriendIcon from "../../assets/img/userbutton.jpg";
import MsgIcon from "../../assets/img/msg.jpg";
import NofiIcon from "../../assets/img/nofi.jpg";
import MenuIcon from "../../assets/img/menu.jpg";
import AvtIcon from "../../assets/img/avt.jpg";
import DefaultAvt from "../../assets/img/default.jpg"
import { connectSocket, socket } from "../../socket";

import { getFriendsRoute } from "../../utils/APIRoutes"

function Friend() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName2, setFirstName2] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatars, setAvatars] = useState('')

  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

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
  // console.log("a"+displayedFRRS)

  // Connect socket
  // useEffect(() => {
  //   if (!socket) {
  //     connectSocket(userId); // login thành công lấy id của user thay vào
  //     console.log(socket)
  //   }
  // }, [userId]);
 

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
      fetch(getFriendsRoute, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success' && data.data.length > 0) {
            // Update state or do other actions with the data
            setFriendrequest(data.data);
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        })
      fetch("https://wind-be.onrender.com/user/get-me", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            const { firstName, lastName, avatar } = data.data;
            setFirstName2(firstName);
            setLastName2(lastName);
            setAvatars(avatar.url);
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
      <div class="container">
        <div id="content" class="content p-0">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img mb-4">
                <img src={avatars} class="mb-4" alt="" />
              </div>

              <div class="profile-header-info">
                <h4 class="m-t-sm">{`${firstName2} ${lastName2}`}</h4>

                <a href="/editprofiles" class="btn btn-xs btn-primary mb-2">Edit Profile</a>
              </div>
            </div>

            <ul class="profile-header-tab nav nav-tabs">
              <li class="nav-item"><a href="#profile-post" class="nav-link" data-toggle="tab">POSTS</a></li>
              <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
              <li class="nav-item"><a href="friend/suggest" class="nav-link" data-toggle="tab">SUGGEST</a></li>
              <li class="nav-item"><a href="/friend/request" class="nav-link" data-toggle="tab">FRIEND REQUEST</a></li>
              <li class="nav-item"><a href="/friend" class="nav-link active show" data-toggle="tab">FRIENDS</a></li>
            </ul>
          </div>

          <div class="profile-container">
            <div class="row row-space-20">
              <div class="col-md-8">
                <div class="tab-content p-0">

                  <div class="tab-pane fade active show" id="profile-friends">
                    <div class="m-b-10"><b>Friend List </b></div>

                    <ul class="friend-list clearfix">
                      {displayedFRRS.map((request, index) => {
                        // Kiểm tra xem request và sender có tồn tại không
                        if (request) {

                          const { firstName, lastName, _id } = request;

                          return (
                            <li key={_id}>
                              <a href="#">
                                <div class="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></div>
                                <div class="friend-info">
                                  <h4>{`${firstName} ${lastName}`}</h4>
                                  <a href="./" >Message</a>
                                </div>
                              </a>
                            </li>
                          );
                        } else {
                          // Trả về một phần tử trống nếu dữ liệu không hợp lệ
                          return null;
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div class="col-md-4 hidden-xs hidden-sm">
                <ul class="profile-info-list">
                
                    <li class="title">FRIEND LIST (9)</li>
                    <li class="img-list">
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                        <a href="#" class="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></a>
                    </li>
                </ul>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Friend;

