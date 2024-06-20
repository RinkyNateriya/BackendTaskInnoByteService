import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpService } from "../service/AccountService"; // Ensure this path is correct

const UserSignup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = true;

    if (!userName.trim()) {
      setUserNameError("User Name is required");
      isValidForm = false;
    } else {
      setUserNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValidForm = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValidForm = false;
    } else {
      setPasswordError("");
    }

    if (!confirmpassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      isValidForm = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValidForm) {
      const data = {
        username: userName,
        email: email,
        password: password,
      };
      const user = await SignUpService(data);
      if (user !== "User Already Exist") {
        // localStorage.setItem("AccessToken", user.data.Token);
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage("Registration successful, please check your email.");
        setUserAlreadyExist(false);
      } else {
        setUserAlreadyExist(true);
        setSuccessMessage("");
      }
    }
  };

  // Function to generate email provider link
  // const getEmailProviderLink = (email) => {
  //   const emailDomain = email.split('@')[1];
  //   switch (emailDomain) {
  //     case 'gmail.com':
  //       return 'https://mail.google.com/';
  //     case 'yahoo.com':
  //       return 'https://mail.yahoo.com/';
  //     case 'outlook.com':
  //       return 'https://outlook.live.com/';
  //     default:
  //       return 'https://mail.google.com/';
  //   }
  // };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">User Signup</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ textAlign: "start" }}>
                  <label htmlFor="firstName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {userNameError && (
                    <div className="text-danger">{userNameError}</div>
                  )}
                </div>

                <div className="mb-3" style={{ textAlign: "start" }}>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </div>
                <div className="mb-3" style={{ textAlign: "start" }}>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                </div>

                <div className="mb-3" style={{ textAlign: "start" }}>
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmpasswordError && (
                    <div className="text-danger">{confirmpasswordError}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-4 btn-block"
                >
                  Signup
                </button>
              </form>
              {userAlreadyExist && (
                <div className="text-danger">User already exists</div>
              )}
              {successMessage && (
                <div className="text-success">
                  {successMessage}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
