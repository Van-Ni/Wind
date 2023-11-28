/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./editprofiles.css";

const UpdateInformationForm = () => {

  const [displayname, setDisplayName] = useState("");
  const [dob, setDob] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
  }, [displayname]);

  const handleCancel = () => {
  };

  const handleUpdate = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to update your profile?');
  
      if (!confirmed) {
        return; // User did not confirm, exit the function
      }
  
      // Check if there are changes compared to the initial state
      if (
        displayname !== initialState.displayname
      ) {
        const token = sessionStorage.getItem("token");
  
        const response = await fetch('https://wind-be.onrender.com/user/update-me', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayname,
          }),
        });
  
        if (response.ok) {
          console.log('Profile updated successfully!');
        } else {
          console.error('Failed to update profile:', response.statusText);
        }
      } else {
        console.log('No changes to update.');
      }
    } catch (error) {
      console.error('An error occurred during profile update:', error);
    }
  };

  return (
    <div className="update-information-form container">
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card testimonial-card mt-2 mb-3">
          <div className="tag-title">
            <label>Update Infomation</label>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <hr style={{ "margin": "0" }} />
          <div className="card-up aqua-gradient"></div>
          <div className="avatar mx-auto white">
            <img
              src='https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=be3454&_nc_ohc=vCgm_rTClrwAX9Zbu8N&_nc_ht=scontent.fdad1-3.fna&oh=00_AfB4tQHN4NndVwSFvy0IUfP23U0swH6HvVlB3s4YCqVJrg&oe=657A4880'
              className="rounded-circle img-fluid"
              alt="avatar"
            />
          </div>
          <div>
            <h4 className="card-title font-weight-bold">Display name</h4>
            <input
              placeholder='Account name'
              type="text"
              id="displayname"
              className="form-control"
              value={displayname}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <hr className='edit-hr' />
            <div>
              <h3 className="personal-info-title">Personal Information</h3>

            </div>
            <div className="form-group">
              <label className="dob">Gender</label>
              <input type="radio" value="Male" name="gender" />Male
              <input type="radio" value="Female" name="gender" /> Female
            </div>

            <div className="form-group">
              <label className="dob">Date of birth</label>
              <input
                type="date"
                id="dob"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="form-btn form-group">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={handleUpdate}> Update </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateInformationForm;
