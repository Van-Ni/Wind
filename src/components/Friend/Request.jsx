import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import io from 'socket.io-client';


function Request() {
  const navigate = useNavigate();

  const [friendrequest, setFriendrequest] = useState([]);
  const [firstName2, setFirstName2] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [idMe, setIdMe] = useState('');
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
 
  const socket = io('https://wind-be.onrender.com/');
  socket.on('connect', () => {
    console.log('Đã kết nối tới server socket');
  });
  socket.on('accept_request', (data) => {
    console.log('Đã chấp nhận lời mời kết bạn:', data);
  });

  const handlerClicks = () => {
    const requestId = _id; // Thay đổi thành id của request
    const senderId = idMe; // Thay đổi thành id của user
    const recipientId = idMe; // Thay đổi thành id của user
  
    socket.emit('accept_request', {
      request_id: requestId,
      sender: senderId,
      recipient: recipientId
    });
console.log(requestId)
    // console.log(socket.emit('accept_request'))
  }
  // window.addEventListener('DOMContentLoaded', () => {
  //   const acceptButton = document.querySelector('#acceptButton');
  //   acceptButton.addEventListener('click', () => {
  //     // Gửi yêu cầu chấp nhận lời mời kết bạn tới server socket
  //     const requestId = _id; // Thay đổi thành id của request
  //     const senderId = idMe; // Thay đổi thành id của user
  //     const recipientId = idMe; // Thay đổi thành id của user
    
  //     socket.emit('accept_request', {
  //       request_id: requestId,
  //       sender: senderId,
  //       recipient: recipientId
  //     });
  //   });
  // });


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
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="mb-4" alt="" />
            </div>

            <div class="profile-header-info">
                  <h4 class="m-t-sm">{`${firstName2} ${lastName2}`}</h4>
               
                <a href="#" class="btn btn-xs btn-primary mb-2">Edit Profile</a>
            </div>
        </div>

        <ul class="profile-header-tab nav nav-tabs">
            <li class="nav-item"><a href="#profile-post" class="nav-link" data-toggle="tab">POSTS</a></li>
            <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
            <li class="nav-item"><a href="/friend/suggest" class="nav-link" data-toggle="tab">SUGGEST</a></li>
            <li class="nav-item"><a href="/friend/request" class="active show" data-toggle="tab">FRIEND REQUEST</a></li>
            <li class="nav-item"><a href="/friend" class="nav-link " data-toggle="tab">FRIENDS</a></li>
        </ul>
    </div>

    <div class="profile-container">
        <div class="row row-space-20">
            <div class="col-md-8">
                <div class="tab-content p-0">

                    <div class="tab-pane fade active show" id="profile-friends">
                        <div class="m-b-10"><b>Friend Request </b></div>

                        <ul class="friend-list clearfix">
                        {displayedFRRS.map((request, index) => {
    // Kiểm tra xem request và sender có tồn tại không
    if (request ) {
     
      const { firstName, lastName, _id } = request;

      return (
        <li key={_id}>
        <a href="#">
            <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></div>
            <div className="friend-info">
                <h4>{`${firstName} ${lastName}`}</h4>
                <button onClick={handlerClicks} id="acceptButton">Accept</button>
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
