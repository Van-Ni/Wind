import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const Profiles = () => {
  // Khởi tạo userData với các thuộc tính mặc định là chuỗi rỗng
  const [userData, setUserData] = useState({
    fullname: "",
    avatar: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        // Cập nhật userData khi dữ liệu được trả về từ API
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!sessionStorage.getItem("token")) {
    setTimeout(() => {
      navigate("/login");
    });
  }

  const fetchUserData = async () => {
    try {
      // Thực hiện lời gọi API để lấy dữ liệu người dùng thực tế
      const token = sessionStorage.getItem("token");
      const response = await fetch("https://wind-be.onrender.com/user/get-me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // Chuyển đổi dữ liệu từ JSON
      const data = await response.json();
      const fullname = `${data.data.firstName} ${data.data.lastName}`;
      return {
        fullname: fullname,
        phone: "0371233559",
        gender: "Male",
        dateOfBirth: "20/10/2000",
        avatar: data.data.avatar.url,
      };
      // console.log(data)

      // Trả về dữ liệu người dùng từ API
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <div id="profiles-container" className="container">
      <section className="mx-auto my-5" style={{ maxWidth: "23rem" }}>
        <div className="card testimonial-card mt-2 mb-3">
          {/* <div className="tag-title">
            <label>Account Information</label>
          </div> */}
          <div className="card-up aqua-gradient">
            <i
              onClick={() => navigate("/friend")}
              className="icon-close fa-solid fa-xmark"
            ></i>
          </div>
          <div className="avatar mx-auto white">
            <img
              style={{
                width: "100%",
                height: "115px",
                objectFit: "fill",
              }}
              src={userData.avatar}
              className="rounded-circle img-fluid"
              alt="avatar"
            />
          </div>
          <div className="card-body text-center">
            {userData && (
              <div>
                <h4 className="card-title font-weight-bold">
                  {userData.fullname}
                </h4>
                <hr />
                <div className="personal-info-container">
                  <h4 className="personal-info-title">Personal Information</h4>
                  <div className="info-row">
                    <label className="info-label">Phone:</label>
                    <input
                      type="text"
                      defaultValue={userData.phone}
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <div className="info-row">
                    <label className="info-label">Gender:</label>
                    <input
                      type="text"
                      defaultValue={userData.gender}
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <div className="info-row">
                    <label className="info-label">Birthday:</label>
                    <input
                      type="text"
                      defaultValue={userData.dateOfBirth}
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <a href="/editProfiles" className="btn btn-xs btn-primary">
                    Update Information
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profiles;
