import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { connectSocket, socket } from "../../socket";
import Logout from "../Logout";
import { getFriendsRoute } from "../../utils/APIRoutes";

function Friend() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
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
  useEffect(() => {
    if (!socket) {
      connectSocket(userId); // login thành công lấy id của user thay vào
    }
  }, [userId]);
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
          if (data.status === "success" && data.data.length > 0) {
            // Update state or do other actions with the data
            setFriendrequest(data.data);
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        });
      fetch("https://wind-be.onrender.com/user/get-me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const { firstName, lastName, avatar } = data.data;
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            if (avatar) {
              sessionStorage.setItem("avatar", avatar.url);
              setAvatar(sessionStorage.getItem("avatar"));
            }
            setFirstName(sessionStorage.getItem("firstName"));
            setLastName(sessionStorage.getItem("lastName"));
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    setFirstName(sessionStorage.getItem("firstName"));
    setLastName(sessionStorage.getItem("lastName"));
    setAvatar(sessionStorage.getItem("avatar"));
  }, [userId]);

  const currentURL = window.location.pathname;

  // Find the navigation links
  const navLinks = document.querySelectorAll(".nav-item a");

  // Loop through the links and add the active class to the matching link
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentURL) {
      link.classList.add("active", "show");
    }
  });

  return (
    <>
      <div className="profile-header">
        <div className="profile-header-cover"></div>
        <div className="profile-header-content">
          <div className="profile-header-img mb-4">
            <img
              src={
                avatar || "https://bootdey.com/img/Content/avatar/avatar7.png"
              }
              className="mb-4"
              alt=""
            />
          </div>

          <div className="profile-header-info">
            <h4 className="m-t-sm">{`${firstName} ${lastName}`}</h4>
            <div style={{ display: "flex" }}>
              <a
                href="/"
                className="btn btn-xs btn-primary"
                style={{ marginRight: "6px" }}
              >
                Messages
              </a>
              <Logout />
            </div>
          </div>
        </div>

        <ul className="profile-header-tab nav nav-tabs">
          <li className="nav-item">
            <a href="#profile-post" className="nav-link" data-toggle="tab">
              POSTS
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/profiles");
              }}
              href="/profiles"
              className="nav-link"
              data-toggle="tab"
            >
              PROFILE
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/friend/suggest");
              }}
              href="/friend/suggest"
              className="nav-link"
              data-toggle="tab"
            >
              SUGGEST
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/friend/request");
              }}
              href="/friend/request"
              className="nav-link"
              data-toggle="tab"
            >
              FRIEND REQUEST
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/friend");
              }}
              href="/friend"
              className="nav-link"
              data-toggle="tab"
            >
              FRIENDS
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Friend;
