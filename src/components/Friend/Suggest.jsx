import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { getUsersRoute } from "../../utils/APIRoutes";
import { connectSocket, socket } from "../../socket";
import ProfileHeader from "./ProfileHeader";

function Suggest() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const imageUrls = [
    "https://bootdey.com/img/Content/avatar/avatar2.png",
    "https://bootdey.com/img/Content/avatar/avatar3.png",
    "https://bootdey.com/img/Content/avatar/avatar4.png",
    "https://bootdey.com/img/Content/avatar/avatar5.png",
    "https://bootdey.com/img/Content/avatar/avatar6.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
    "https://bootdey.com/img/Content/avatar/avatar8.png",
    "https://bootdey.com/img/Content/avatar/avatar1.png",
  ];
  const randomImageUrl =
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

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

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setTimeout(() => {
        navigate("/login");
      });
    }
  }, [sessionStorage.getItem("token")]);

  // Khởi tạo kết nối socket khi trang web được tải
  useEffect(() => {
    if (!socket) {
      connectSocket(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (socket) {
      socket.on("request_sent", (response) => {
        alert(response.message);
      });
    }
  }, [socket]);

  const sendRequest = (id) => {
    // Gửi yêu cầu thông qua kết nối socket đã được khởi tạo
    socket.emit(
      "friend_request",
      {
        to: id,
        from: userId,
      },
      (response) => {
        console.log(response);
      }
    );
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setTimeout(() => {
        navigate("/login");
      });
    } else {
      fetch(getUsersRoute, {
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
                      <b>Friend Suggest</b>
                    </div>

                    <ul className="friend-list clearfix">
                      {displayedFRRS.map((request, index) => {
                        // Kiểm tra xem request và sender có tồn tại không
                        if (request) {
                          const { firstName, lastName, _id } = request;
                          const randomImageUrl =
                            imageUrls[
                              Math.floor(Math.random() * imageUrls.length)
                            ];
                          return (
                            <li key={_id}>
                              <a href="#">
                                <div className="friend-img">
                                  <img src={randomImageUrl} alt="" />
                                </div>
                                <div className="friend-info">
                                  <h4>{`${firstName} ${lastName}`}</h4>
                                  <button
                                    onClick={() => {
                                      // Handle the event (send request)
                                      sendRequest(_id);
                                  
                                      // Reload the page
                                      window.location.reload();
                                    }}
                                    className="btn btn-xs btn-primary mb-2"
                                  >
                                    Add Friend
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

export default Suggest;
