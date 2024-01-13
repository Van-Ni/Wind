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
import DefaultAvt from "../../assets/img/default.jpg";
import { connectSocket, socket } from "../../socket";
import Logout from "../Logout";
import { getFriendsRoute } from "../../utils/APIRoutes";
import ProfileHeader from "./ProfileHeader";

function Friend() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
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
  // Nhắn tin
  const startChatting = useCallback((id) => {
    socket.emit(
      "start_conversation",
      {
        to: id,
        from: userId,
      },
      (response) => {
        console.log(response.status);
      }
    );
  });
  // Nhận sự kiện start_chat
  useEffect(() => {
    if (socket) {
      socket.on("start_chat", (response) => {
        navigate("/", { state: { id: response.participants[0]._id } });
      });
    }
  }, [socket]);

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
          if (data.status === "success" && data.data.length > 0) {
            // Update state or do other actions with the data
            setFriendrequest(data.data);
          } else {
            console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
          }
        });
    }
  }, []);

  return (
    <>
      <div className="container">
        <div id="content" className="content p-0">
          <ProfileHeader />

          <div className="profile-container">
            <div className="row row-space-20">
              <div className="col-md-8">
                <div className="tab-content p-0">
                  <div
                    className="tab-pane fade active show"
                    id="profile-friends"
                  >
                    <div className="m-b-10">
                      <h5>Friend List </h5>
                    </div>

                    <ul className="friend-list clearfix">
                      {displayedFRRS.map((request, index) => {
                        // Kiểm tra xem request và sender có tồn tại không
                        if (request) {
                          const { firstName, lastName, _id } = request;
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
                                  <h4
                                    style={{ margin: "0" }}
                                  >{`${firstName} ${lastName}`}</h4>
                                  <button
                                    onClick={() => startChatting(_id)}
                                    className="btn btn-xs btn-primary"
                                  >
                                    Chat
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

              {/* <div className="col-md-4 hidden-xs hidden-sm">
                <ul className="profile-info-list">
                
                    <li className="title">FRIEND LIST (9)</li>
                    <li className="img-list">
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                        <a href="#" className="m-b-5"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></a>
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
