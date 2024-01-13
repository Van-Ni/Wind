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

function Friend() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
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
  // Gửi sự kiện yêu cầu kết bạn
  // const testYeuCauKetBan = useCallback(() => {
  //   socket.emit("friend_request", {
  //     to: "65508d6a73ad8e1036a91091", // Id của tài khoản quocan@gmail.com
  //     from: userId
  //   }, (response) => {
  //     console.log(response.status)
  //   })
  // }, [userId])
  // // Nhận sự kiện request_sent và trả về message
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("request_sent", (response) => {
  //       console.log(response);
  //     });
  //   }
  // }, [socket]);

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
            const { firstName, lastName } = data.data;

            // Update state or do other actions with the data
            setFirstName2(firstName);
            setLastName2(lastName);
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
                <div style={{display:"flex"}}>
                  <a href="/profiles" className="btn btn-xs btn-primary" style={{"marginRight": "6px"}}>
                    Details
                  </a>
                  <a href="/" className="btn btn-xs btn-primary" style={{"marginRight": "6px"}}>
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
                <a href="#profile-about" className="nav-link" data-toggle="tab">
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a href="friend/suggest" className="nav-link" data-toggle="tab">
                  SUGGEST
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/friend/request"
                  className="nav-link"
                  data-toggle="tab"
                >
                  FRIEND REQUEST
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/friend"
                  className="nav-link active show"
                  data-toggle="tab"
                >
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
                      <b>Friend List </b>
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
                                  <h4>{`${firstName} ${lastName}`}</h4>
                                  <button
                                    onClick={() => startChatting(_id)}
                                    className="btn btn-xs btn-primary mb-2"
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
