import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./editprofiles.css";

const UpdateInformationForm = () => {
  const [displayname, setDisplayName] = useState("");
  const [accountname, setAccountName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  return (
    <div className="update-information-form container">
        <h1>Cập nhật thông tin</h1>
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card testimonial-card mt-2 mb-3">
          <div className="card-up aqua-gradient"></div>
          <div className="avatar mx-auto white">
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2831%29.jpg"
              className="rounded-circle img-fluid"
              alt="woman avatar"
            />
          </div>
          <div className="card-body text-center">
            <h4 className="card-title font-weight-bold">Martha Smith</h4>
            <hr />
            <p>
              <i className="fas fa-quote-left"></i> Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Eos, adipisci
            </p>
          </div>
        </div>
      </section>

      <div className="">
        
        <div className="form-group">
          <label htmlFor="displayname">Tên hiển thị</label>
          <input
            type="text"
            id="displayname"
            className="form-control"
            value={displayname}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountname">Tên tài khoản</label>
          <input
            type="text"
            id="accountname"
            className="form-control"
            value={accountname}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Giới tính</label>
          <select
            id="gender"
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Ngày sinh</label>
          <input
            type="date"
            id="dob"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Cập nhật</button>
          <button type="button" className="btn btn-secondary">Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateInformationForm;