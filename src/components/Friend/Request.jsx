import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { getRequestsRoute } from "../../utils/APIRoutes";
import { connectSocket, socket } from "../../socket";
import ProfileHeader from "./ProfileHeader";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Request() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const fetchData = useCallback(() => {
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
    }
  }, []);

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
        toast.success(response.message, {
          toastId: "success",
        });
        fetchData();
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
    fetchData();
  }, [socket]);

  return (
    <>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        style={{ fontSize: "16px" }}
      />
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
                      <b>Friend Request </b>
                    </div>

                    <ul className="friend-list clearfix">
                      {displayedFRRS.map((request, index) => {
                        // Kiểm tra xem request và sender có tồn tại không
                        if (request) {
                          const { firstName, lastName, _id } = request.sender;
                          console.log(request);
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
                                    onClick={() => {
                                      // Handle the event (send request)
                                      acceptRequest(_id, requestId);

                                      // Reload the page
                                      // window.location.reload();
                                    }}
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
