import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import io from "socket.io-client";
import socketio from "socket.io-client";

import { getRequestsRoute } from "../../utils/APIRoutes";
import { connectSocket, socket } from "../../socket";
import Logout from "../Logout";
function Request() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [idMe, setIdMe] = useState("");
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

  // Khởi tạo kết nối socket khi trang web được tải
  useEffect(() => {
    if (!socket) {
      connectSocket(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (socket) {
      socket.on("request_accepted", (response) => {
        alert(response);
      });
    }
  }, [socket]);

  // Hàm xử lý sự kiện click
  const acceptRequest = (userRequest, idRequest) => {
    // Gửi yêu cầu thông qua kết nối socket đã được khởi tạo
    socket.emit(
      "accept_request",
      {
        request_id: idRequest,
        sender: userRequest,
        recipient: userId,
      },
      (response) => {
        console.log(response);
      }
    );
  };

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
      fetch(getRequestsRoute, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success" && data.data.length > 0) {
            const { sender } = data.data[0];
            const { firstName, lastName, _id } = sender;

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
            const { firstName, lastName, _id } = data.data;

            // Update state or do other actions with the data
            setFirstName2(firstName);
            setLastName2(lastName);
            setIdMe(_id);
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [socket]);

  return (
    <>
      <div className="container">
        <div id="content" className="content p-0">
          <div className="profile-header">
            <div className="profile-header-cover"></div>
            <div className="profile-header-content">
              <div className="profile-header-img mb-4">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  className="mb-4"
                  alt=""
                />
              </div>

              <div className="profile-header-info">
                <h4 className="m-t-sm">{`${firstName2} ${lastName2}`}</h4>

                <div style={{ display: "flex" }}>
                  <a
                    href="#"
                    className="btn btn-xs btn-primary"
                    style={{ marginRight: "6px" }}
                  >
                    Edit Profile
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
                <a href="#profile-about" className="nav-link" data-toggle="tab">
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/friend/suggest"
                  className="nav-link"
                  data-toggle="tab"
                >
                  SUGGEST
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/friend/request"
                  className="active show"
                  data-toggle="tab"
                >
                  FRIEND REQUEST
                </a>
              </li>
              <li className="nav-item">
                <a href="/friend" className="nav-link " data-toggle="tab">
                  FRIENDS
                </a>
              </li>
            </ul>
          </div>

          <div className="profile-container">
            <div className="row row-space-20">
              <div className="col-md-8">
                <div className="tab-content p-0">
                  <div
                    className="tab-pane fade active show"
                    id="profile-friends"
                  >
                    <div className="m-b-10">
                      <b>Friend Request </b>
                    </div>

                    <ul className="friend-list clearfix">
                      {displayedFRRS.map((request, index) => {
                        // Kiểm tra xem request và sender có tồn tại không
                        if (request) {
                          const { firstName, lastName, _id } = request.sender;
                          const requestId = request._id;
                          return (
                            <li key={_id}>
                              <a href="#">
                                <div className="friend-img">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                    alt=""
                                  />
                                </div>
                                <div className="friend-info">
                                  <h4>{`${firstName} ${lastName}`}</h4>
                                  <button
                                    onClick={() => acceptRequest(_id, requestId)}
                                    id="acceptButton"
                                    className="btn btn-xs btn-primary mb-2"
                                  >
                                    Accept
                                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Request;
