import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../service/AccountService'; // Ensure this path is correct

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const[incorrect, setIncorrect]= useState(false);
  const message= "Email password combination doesnot match"

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = true;

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

    if (isValidForm) {
      const data = {
        email: email,
        password: password,
      };
      const user = await LoginService(data);
      if (user) {
        localStorage.setItem("AccessToken", user.data.Token);
        navigate("/UserProfile");
        setEmail("");
        setPassword("");
      }
      else {
        setIncorrect(true);
              }
    
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">User Login</h4>
              <form onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="btn btn-primary mb-4 btn-block"
                >
                  Login
                </button>
              </form>
              {incorrect && <div>
               { message}
              </div> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
