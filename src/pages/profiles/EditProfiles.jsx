import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editprofiles.css";
import { useNavigate } from "react-router-dom";

const UpdateInformationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState();
  const [avatar, avatarFile] = useState(null);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [userData, setUserData] = useState({
    fullname: "",
    avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
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
      return {
        firstName: `${data.data.firstName}`,
        lastName: `${data.data.lastName}`,
        phone: "0371233559",
        gender: "Male",
        dateOfBirth: "20/10/2000",
        avatar: data.data.avatar.url || "https://bootdey.com/img/Content/avatar/avatar2.png",
      };
      // console.log(data)

      // Trả về dữ liệu người dùng từ API
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleUpdate = async () => {
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("file", file);

    try {
      // Make the PUT request to update user information
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://wind-be.onrender.com/user/update-me",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        alert("User information updated successfully");
        // Optionally, you can navigate to another page or perform other actions
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        alert("Failed to update user information. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/profiles");
  };

  const hanldeSelectedImage = (event, elementId) => {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
      setFile(fileInput.files[0]);
    }
  };

  return (
    <div className="update-information-form container">
      <section className="mx-auto my-5" style={{ maxWidth: "23rem" }}>
        <div className="card testimonial-card mt-2 mb-3">
          {/* <div className="tag-title">
            <label>Update Infomation</label>
          </div> */}
          <div className="card-up aqua-gradient">
            <i
              onClick={() => navigate("/friend")}
              className="icon-close fa-solid fa-xmark"
            ></i>
          </div>
          <div className="avatar mx-auto white">
            {/* <img
              src='https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=vCgm_rTClrwAX9Zbu8N&_nc_ht=scontent.fdad1-3.fna&oh=00_AfB4tQHN4NndVwSFvy0IUfP23U0swH6HvVlB3s4YCqVJrg&oe=657A4880'
              className="rounded-circle img-fluid"
              alt="avatar"
            /> */}

            <img
              style={{
                width: "100%",
                height: "115px",
                objectFit: "fill",
              }}
              id="selectedAvatar"
              src={userData.avatar || "https://bootdey.com/img/Content/avatar/avatar2.png"}
              className="rounded-circle img-fluid"
              alt="example placeholder"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="btn btn-primary btn-rounded"
              style={{
                position: "absolute",
                right: "30%",
                top: "23%",
                padding: "0",
              }}
            >
              <label className="text-white" htmlFor="customFile2">
                <i
                  className="fa-solid fa-camera"
                  style={{ cursor: "pointer", margin: "4px" }}
                ></i>
              </label>

              <input
                type="file"
                className="form-control d-none"
                id="customFile2"
                onChange={(event) =>
                  hanldeSelectedImage(event, "selectedAvatar")
                }
              />
            </div>
          </div>
          <div>
            <h4 className="card-title font-weight-bold">First name</h4>
            <input
              placeholder="Account name"
              type="text"
              id="displayname"
              className="form-control"
              // value={displayname}
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={userData.firstName}
            />
            <h4 className="card-title font-weight-bold">Last name</h4>
            <input
              placeholder="Account name"
              type="text"
              id="displayname"
              className="form-control"
              // value={displayname}
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={userData.lastName}
            />

            <hr className="edit-hr" />
            <div>
              <h4 className="content_personal personal-info-title">
                Personal Information
              </h4>
            </div>
            <div className="form-group">
              <label className="dob">Gender</label>
              <input
                type="radio"
                value="Male"
                name="gender"
                defaultChecked={true}
              />
              Male
              <input type="radio" value="Female" name="gender" /> Female
            </div>

            <div className="form-group">
              <label className="dob">Birthday</label>
              <input
                type="date"
                id="dob"
                className="form-control"
                // value={dob}
                onChange={(e) => setDob(e.target.value)}
                defaultValue="2000-10-20"
              />
            </div>

            <div className="form-btn form-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                {" "}
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateInformationForm;
