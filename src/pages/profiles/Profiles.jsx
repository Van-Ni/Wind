import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useNavigate, Link } from 'react-router-dom';


const Profiles = () => {
  const navigate = useNavigate();

  // Khởi tạo userData với các thuộc tính mặc định là chuỗi rỗng
  const [userData, setUserData] = useState({
    username: '',
    avatar: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=5M6dc--QEiUAX-e7CiS&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAs7VU4nQ2aIxiVK-q8HqkgD5bEprMEYMe1ZRK4F3JQJg&oe=6584D480',
    phone: '0371233559',
    gender: 'Male',
    dateOfBirth: '20/10/2000',
  });

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        // Cập nhật userData khi dữ liệu được trả về từ API
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // if (!sessionStorage.getItem("token")) {
  //   setTimeout(() => {
  //     navigate("/login");
  //   });
  // }

  const fetchUserData = async () => {
    try {
      // Thực hiện lời gọi API để lấy dữ liệu người dùng thực tế
      const token = sessionStorage.getItem("token");
      const response = await fetch("https://wind-be.onrender.com/user/get-me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTU5Y2IxNzk0ZTI2NDNhNjA3YjY1MzQiLCJpYXQiOjE3MDA5MDgzMTgsImV4cCI6MTcwMDk5NDcxOH0.kgioHa7HjwbXui1JiuYRO3p9IAiqDvYhLqufSROzarw`}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      // Chuyển đổi dữ liệu từ JSON
      const data = await response.json();

      const fullname = `${data.data.firstName} ${data.data.lastName}`;
      data.fullname = fullname;
      setUserData(data);
      // console.log(data)
        
      // Trả về dữ liệu người dùng từ API
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  return (
    <div id="profiles-container" className="container">
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card testimonial-card mt-2 mb-3">
          <div className="tag-title">
            <label>Account Information</label>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <hr style={{ "margin": "0" }} />
          <div className="card-up aqua-gradient"></div>
          <div className="avatar mx-auto white">
            <img
              src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=5M6dc--QEiUAX-e7CiS&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAs7VU4nQ2aIxiVK-q8HqkgD5bEprMEYMe1ZRK4F3JQJg&oe=6584D480"
              className="rounded-circle img-fluid"
              alt="avatar"
            />
          </div>
          <div className="card-body text-center">
            {userData && (
              <div>
                <h4 className="card-title font-weight-bold">{userData.fullname}</h4>
                <hr />
                <div className="personal-info-container">
                  <h3 className="personal-info-title">Personal Information</h3>
                  <div className="info-row">
                    <label className="info-label">Phone:</label>
                    <input
                      type="text"
                      defaultValue={userData.phone }
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <div className="info-row">
                    <label className="info-label">Gender:</label>
                    <input
                      type="text"
                      defaultValue={userData.gender }
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <div className="info-row">
                    <label className="info-label">Date of Birth:</label>
                    <input
                      type="text"
                      defaultValue={userData.dateOfBirth }
                      className="info-value"
                      readOnly
                    />
                  </div>
                  <Link to="/editProfiles" className="update-button">Update Information</Link>
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
