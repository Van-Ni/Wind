// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import "./style.css";
// import { connectSocket, socket } from "../../socket";
// import { getUsersRoute } from "../../utils/APIRoutes"




// function Suggest() {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
//   const [friendrequest, setFriendrequest] = useState([]);
//   const [firstName2, setFirstName2] = useState('');
//   const [lastName2, setLastName2] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 20;
//   const [showDropdown, setShowDropdown] = useState(false);
//   const imageUrls = [
//     "https://bootdey.com/img/Content/avatar/avatar2.png",
//     "https://bootdey.com/img/Content/avatar/avatar3.png",
//     "https://bootdey.com/img/Content/avatar/avatar4.png",
//     "https://bootdey.com/img/Content/avatar/avatar5.png",
//     "https://bootdey.com/img/Content/avatar/avatar6.png",
//     "https://bootdey.com/img/Content/avatar/avatar7.png",
//     "https://bootdey.com/img/Content/avatar/avatar8.png",
//     "https://bootdey.com/img/Content/avatar/avatar1.png"
//   ];
//   const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]; 


//   const handleDropdownToggle = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleOptionClick = () => {

//    };
//   const displayedFRRS = useMemo(() => {
//     // Kiểm tra nếu friendrequest không phải là một mảng
//     if (!Array.isArray(friendrequest)) {
//       return []; // Trả về một mảng rỗng hoặc giá trị mặc định tương ứng
//     }
    
//     // Tính toán danh sách sản phẩm hiển thị trên trang
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     return friendrequest.slice(startIndex, endIndex);
//   }, [friendrequest]);
 
//     // Connect socket
//     useEffect(() => {
//       if (!socket) {
//         connectSocket(userId); // login thành công lấy id của user thay vào
//         console.log(socket)
//       }
//     }, [userId]);
//     // Gửi sự kiện yêu cầu kết bạn
//     const testYeuCauKetBan = useCallback(() => {
//       socket.emit("friend_request", {
//         to: "653385a8a95841abc1b58eee", // Id của tài khoản được nhấn request
//         from: userId
//       }, (response) => {
//         console.log(response.status)
//       })
//     }, [userId])
//     // Nhận sự kiện request_sent và trả về message
//     useEffect(() => {
//       if (socket) {
//         socket.on("new_friend_request", (response) => {
//           console.log(response);
//         });
//       }
//     }, [socket]);

//     useEffect(() => {
//       if (socket) {
//         socket.on("request_sent", (response) => {
//           console.log(response);
//         });
//       }
//     }, [socket]);


//     // const handlerClicks = testYeuCauKetBan()
  



//   useEffect(() => {
//     if (!sessionStorage.getItem("token")) {
//       setTimeout(() => {
//         navigate("/login");
//       });
//     }
//   }, [sessionStorage.getItem("token")]);
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
  
//     if (!token) {
//       setTimeout(() => {
//         navigate("/login");
//       });
//     } else {
//       fetch(getUsersRoute, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
         
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.status === 'success' && data.data.length > 0) {
           
         
//             setFriendrequest(data.data);
//           } else {
//             console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
//           }
//         })
//         fetch("https://wind-be.onrender.com/user/get-me", {
//           method: "GET",
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.status === 'success') {
//             const { firstName, lastName } = data.data;
            
//             // Update state or do other actions with the data
//             setFirstName2(firstName);
//             setLastName2(lastName);
//           } else {
//             console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
//           }
//         })
//         .catch((error) => console.log(error));
//       }
//     }, []);

//   console.log(friendrequest)

//   const { firstName, lastName, _id } = displayedFRRS[0]?.sender || {};
  
//   return (
//     <>
//     <div className="container">
//    <div id="content" className="content p-0">
//        <div className="profile-header">
//            <div className="profile-header-cover"></div>
//            <div className="profile-header-content">
//                <div className="profile-header-img mb-4">
//                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="mb-4" alt="" />
//                </div>
   
//                <div className="profile-header-info">
//                <h4 class="m-t-sm">{`${firstName2} ${lastName2}`}</h4>
                  
//                    <a href="#" className="btn btn-xs btn-primary mb-2">Edit Profile</a>
//                </div>
//            </div>
   
//            <ul class="profile-header-tab nav nav-tabs">
//             <li class="nav-item"><a href="#profile-post" class="nav-link" data-toggle="tab">POSTS</a></li>
//             <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
//             <li class="nav-item"><a href="#" class="nav-link active show" data-toggle="tab">SUGGEST</a></li>
//             <li class="nav-item"><a href="/friend/request" class="nav-link" data-toggle="tab">FRIEND REQUEST</a></li>
//             <li class="nav-item"><a href="/friend" class="nav-link " data-toggle="tab">FRIENDS</a></li>
//         </ul>
//        </div>
   
//        <div className="profile-container">
//            <div className="row row-space-20">
//                <div className="col-md-8">
//                    <div className="tab-content p-0">
   
//                        <div className="tab-pane fade active show" id="profile-friends">
//                            <div className="m-b-10"><b>Friend Suggest</b></div>
   
//                            <ul className="friend-list clearfix">
//                            {displayedFRRS.map((request, index) => {
//        // Kiểm tra xem request và sender có tồn tại không
//        if (request ) {
        
//          const { firstName, lastName, _id } = request;
//          const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
//          return (
//            <li key={_id}>
//            <a href="#">
//                <div className="friend-img"><img src={randomImageUrl} alt="" /></div>
//                <div className="friend-info">
//                    <h4>{`${firstName} ${lastName}`}</h4>
//                    <button onClick={testYeuCauKetBan} id="acceptButton">Add Friend</button>
                 
//                </div>
//            </a>
//        </li>
//              );
//            } else {
//              // Trả về một phần tử trống nếu dữ liệu không hợp lệ
//              return null;
//            }
//          })}
//                            </ul>
//                        </div>
//                    </div>
//                </div>
   
//            </div>
//        </div>
//    </div>
//    </div>
//        </>
//   );
// }

// export default Suggest;

// /*
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import "./style.css";
// import { connectSocket } from "../../socket"; // Updated import

// const useClickHandler = (idSuggest, idMe) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = connectSocket(idMe);

//     // Listen for the connect event to know when the socket is connected
//     newSocket.on("connect", () => {
//       setSocket(newSocket);
//     });

//     // Listen for the disconnect event to know when the socket is disconnected
//     newSocket.on("disconnect", () => {
//       setSocket(null);
//     });

//     return () => {
//       // Disconnect the socket when the component is unmounted
//       newSocket.disconnect();
//     };
//   }, [idMe]);

//   const handlerClicks = useCallback(() => {
//     // Check if the socket is connected before emitting the event
//     if (socket && socket.connected) {
//       socket.emit("friend_request", { to: idSuggest, from: idMe }, (response) => {
//         console.log(response.status);
//       });
//     }
//   }, [socket, idSuggest, idMe]);

//   return { handlerClicks };
// };

// function Suggest() {
//   const navigate = useNavigate();

//   const [friendrequest, setFriendrequest] = useState([]);
//   const [firstName2, setFirstName2] = useState('');
//   const [lastName2, setLastName2] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 20;
//   const [showDropdown, setShowDropdown] = useState(false);
//   const imageUrls = [
//     "https://bootdey.com/img/Content/avatar/avatar2.png",
//     "https://bootdey.com/img/Content/avatar/avatar3.png",
//     "https://bootdey.com/img/Content/avatar/avatar4.png",
//     "https://bootdey.com/img/Content/avatar/avatar5.png",
//     "https://bootdey.com/img/Content/avatar/avatar6.png",
//     "https://bootdey.com/img/Content/avatar/avatar7.png",
//     "https://bootdey.com/img/Content/avatar/avatar8.png",
//     "https://bootdey.com/img/Content/avatar/avatar1.png"
//   ];
//   const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
//   const [idMe, setIdMe] = useState('');
//   const [idSuggest, setIdSuggest] = useState("");
//   const { handlerClicks } = useClickHandler(idSuggest, idMe);

//   const handleDropdownToggle = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const displayedFRRS = useMemo(() => {
//     // Check if friendrequest is an array
//     if (!Array.isArray(friendrequest)) {
//       return [];
//     }

//     // Calculate the displayed list of products on the page
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     return friendrequest.slice(startIndex, endIndex);
//   }, [friendrequest]);

//   useEffect(() => {
//     handlerClicks(); // Initialize socket when the component mounts
//   }, [handlerClicks]);

//   useEffect(() => {
//     if (!sessionStorage.getItem("token")) {
//       setTimeout(() => {
//         navigate("/login");
//       });
//     }
//   }, [sessionStorage.getItem("token")]);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (!token) {
//       setTimeout(() => {
//         navigate("/login");
//       });
//     } else {
//       fetch("https://wind-be.onrender.com/user/get-me", {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.status === 'success') {
//             const { firstName, lastName, _id } = data.data;
//             setIdMe(_id);
//             setFirstName2(firstName);
//             setLastName2(lastName);
//           } else {
//             console.log("Không có dữ liệu hoặc dữ liệu không đúng định dạng");
//           }
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [navigate]);

//   const handleClick = (idSuggest) => {
//     // Call the function that sends friend request
//     handlerClicks(idSuggest);
//   };
  
//   return (
//     <>
//     <div className="container">
//    <div id="content" className="content p-0">
//        <div className="profile-header">
//            <div className="profile-header-cover"></div>
//            <div className="profile-header-content">
//                <div className="profile-header-img mb-4">
//                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="mb-4" alt="" />
//                </div>
   
//                <div className="profile-header-info">
//                <h4 class="m-t-sm">{`${firstName2} ${lastName2}`}</h4>
                  
//                    <a href="#" className="btn btn-xs btn-primary mb-2">Edit Profile</a>
//                </div>
//            </div>
   
//            <ul class="profile-header-tab nav nav-tabs">
//             <li class="nav-item"><a href="#profile-post" class="nav-link" data-toggle="tab">POSTS</a></li>
//             <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
//             <li class="nav-item"><a href="friend/suggest" class="nav-link active show" data-toggle="tab">SUGGEST</a></li>
//             <li class="nav-item"><a href="/friend/request" class="nav-link" data-toggle="tab">FRIEND REQUEST</a></li>
//             <li class="nav-item"><a href="/friend" class="nav-link " data-toggle="tab">FRIENDS</a></li>
//         </ul>
//        </div>
   
//        <div className="profile-container">
//            <div className="row row-space-20">
//                <div className="col-md-8">
//                    <div className="tab-content p-0">
   
//                        <div className="tab-pane fade active show" id="profile-friends">
//                            <div className="m-b-10"><b>Friend Suggest</b></div>
   
//                            <ul className="friend-list clearfix">
//                            {displayedFRRS.map((request, index) => {
//        // Kiểm tra xem request và sender có tồn tại không
//        if (request ) {
        
//          const { firstName, lastName, _id } = request;
//          const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
//          return (
//            <li key={_id}>
//            <a href="#">
//                <div className="friend-img"><img src={randomImageUrl} alt="" /></div>
//                <div className="friend-info">
//                    <h4>{`${firstName} ${lastName}`}</h4>
//                    <button onClick={() => handleClick(_id)} id="acceptButton">
//                       Add Friend
//                     </button>
//                </div>
//            </a>
//        </li>
//              );
//            } else {
//              // Trả về một phần tử trống nếu dữ liệu không hợp lệ
//              return null;
//            }
//          })}
//                            </ul>
//                        </div>
//                    </div>
//                </div>
   
//            </div>
//        </div>
//    </div>
//    </div>
//        </>
//   );
// }

// export default Suggest;


// */


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
  const productsPerPage = 20;
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

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = () => {
    // Handle option click if needed
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

  // Connect socket
  useEffect(() => {
    if (!socket) {
      connectSocket(userId); // login thành công lấy id của user thay vào
    }
  }, [userId]);

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
      socket.on("new_friend_request", (response) => {
        console.log(response);
      });
    }
  }, [socket]);

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
              <a href="#" className="btn btn-xs btn-primary mb-2">Edit Profile</a>
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
          <div className="row row-space-20">
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
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Suggest;