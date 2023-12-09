import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { connectSocket, socket } from "../../socket";
import { getUsersRoute } from "../../utils/APIRoutes";

function Suggest() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName2, setFirstName2] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatars, setAvatars] = useState('')
  const imageUrls = [
    "https://bootdey.com/img/Content/avatar/avatar2.png",
    "https://bootdey.com/img/Content/avatar/avatar3.png",
    "https://bootdey.com/img/Content/avatar/avatar4.png",
    "https://bootdey.com/img/Content/avatar/avatar5.png",
    "https://bootdey.com/img/Content/avatar/avatar6.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
    "https://bootdey.com/img/Content/avatar/avatar8.png",
    "https://bootdey.com/img/Content/avatar/avatar1.png"
  ];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]; 
  const [displayedFriendsCount, setDisplayedFriendsCount] = useState(productsPerPage);

  const handleMoreButtonClick = () => {
    setDisplayedFriendsCount((prevCount) => prevCount + productsPerPage);
  };
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = () => {
    // Handle option click if needed
  };
const displayedFRRS = useMemo(() => {
      // Kiểm tra nếu friendrequest không phải là một mảng
    if (!Array.isArray(friendrequest)) {
      return [];
    }
    //Tính toán danh sách hiển thị trên trang
    const endIndex = Math.min(displayedFriendsCount, friendrequest.length);
    return friendrequest.slice(0, endIndex);
  }, [friendrequest, displayedFriendsCount]);

  // Connect socket
  useEffect(() => {
    if (!socket) {
      connectSocket(userId); // login thành công lấy id của user thay vào
    }
  }, [userId]);
  console.log('Connect', socket);

  // Gửi sự kiện yêu cầu kết bạn
  const testYeuCauKetBan = useCallback((toUserId) => {
    socket.emit("friend_request", {
      to: toUserId,
      from: userId
    }, (response) => {
      console.log(response.status);
    });
  }, [userId, socket]);

  // Nhận sự kiện request_sent và trả về message
  useEffect(() => {
    if (socket) {
      socket.on("request_sent", (response) => {
        console.log(response);
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
      fetch(getUsersRoute, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success' && data.data.length > 0) {
            setFriendrequest(data.data);
            console.log(friendrequest);
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
    }, [navigate]);

  return (
    <>
    <div className="container">
      <div id="content" className="content p-0">
        <div className="profile-header">
          <div className="profile-header-cover"></div>
          <div className="profile-header-content">
            <div className="profile-header-img mb-4">
              <img src={avatars} className="mb-4" alt="" />
            </div>
   
            <div className="profile-header-info">
              <h4 class="m-t-sm">{`${firstName2} ${lastName2}`}</h4>
              <a href="/editprofiles" className="btn btn-xs btn-primary mb-2">Edit Profile</a>
            </div>
          </div>
   
          <ul class="profile-header-tab nav nav-tabs">
            <li class="nav-item"><a href="#profile-post" class="nav-link" data-toggle="tab">POSTS</a></li>
            <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
            <li class="nav-item"><a href="#" class="nav-link active show" data-toggle="tab">SUGGEST</a></li>
            <li class="nav-item"><a href="/friend/request" class="nav-link " data-toggle="tab">FRIEND REQUEST</a></li>
            <li class="nav-item"><a href="/friend" class="nav-link " data-toggle="tab">FRIENDS</a></li>
          </ul>
        </div>
   
        <div className="profile-container">
          <div className="row-space-20">
            <div className="col-md-8">
              <div className="tab-content p-0">
                <div className="tab-pane fade active show" id="profile-friends">
                  <div className="m-b-10"><b>Friend Suggest</b></div>
   
                  <ul className="friend-list clearfix">
                    {displayedFRRS.map((request, index) => {
                      // Kiểm tra xem request và sender có tồn tại không
                      if (request ) {
                        const { firstName, lastName, _id } = request;
                        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                        return (
                          <li key={_id}>
                            <a href="#">
                              <div className="friend-img"><img src={randomImageUrl} alt="" /></div>
                              <div className="friend-info">
                                <h4>{`${firstName} ${lastName}`}</h4>
                                <button onClick={() => testYeuCauKetBan(_id)} id="acceptButton">Add Friend</button>
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
            {displayedFriendsCount < friendrequest.length && (
                  <button onClick={handleMoreButtonClick} className="btn btn-primary">
                    More
                  </button>
                )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Suggest;
