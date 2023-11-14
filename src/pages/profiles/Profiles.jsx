import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Profiles = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const fetchUserData = async () => {
    // Gọi API hoặc xử lý logic để lấy dữ liệu
    // Ví dụ: const response = await fetch('/api/user');
    // const data = await response.json();
    // return data;

    // Giả sử dữ liệu trả về từ API là một đối tượng user
    const user = {
      username: 'Cristiano Ronaldo',
      avatar: 'https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=vCgm_rTClrwAX9Zbu8N&_nc_ht=scontent.fdad1-3.fna&oh=00_AfB4tQHN4NndVwSFvy0IUfP23U0swH6HvVlB3s4YCqVJrg&oe=657A4880',
      phone: '164235625',
      gender: 'male',
      dateOfBirth: '1970',
    };

    return user;
  };

  const renderUserProfile = () => {
    if (userData) {
      return (
        <div>
            <h4 className="card-title font-weight-bold">{userData.username}</h4>
          <hr />
          {/* <p>
            <i className="fas fa-quote-left"></i> Never give up
          </p> */}
          <div className="personal-info-container">
            <h3 className="personal-info-title">Personal Information</h3>
            <div className="info-row">
              <label className="info-label">Phone:</label>
              <input type="text" value={userData.phone} className="info-value" readOnly />
            </div>
            <div className="info-row">
              <label className="info-label">Gender:</label>
              <input type="text" value={userData.gender} className="info-value" readOnly />
            </div>
            <div className="info-row">
              <label className="info-label">Date of Birth:</label>
              <input type="text" value={userData.dateOfBirth} className="info-value" readOnly />
            </div>
            <button className="update-button">Update Information</button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card testimonial-card mt-2 mb-3">
            <div className="tag-title">
              <label>Account Infomation</label>
              <i class="fa-solid fa-xmark"></i>
            </div>
          <hr style={{"margin":"0"}} />
          <div className="card-up aqua-gradient"></div>
          <div className="avatar mx-auto white">
          <img
            src={userData?.avatar}
            className="rounded-circle img-fluid"
            alt="avatar"
          />
          </div>
          <div className="card-body text-center">
            {renderUserProfile()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profiles;
