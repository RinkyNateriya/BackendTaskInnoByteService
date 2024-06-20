import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar1 = () => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('AccessToken');
    if(!data) {
    if(location.pathname==="/UserProfile"){
      navigate("/")
    }
    }
    else{
      navigate("/UserProfile")
      setHasData(true);
    }
  
    
  }, [location]);



  const logoutHandler = () => {
    localStorage.removeItem('AccessToken');
    setTimeout(function(){navigate("/UserSignup")},2000);
    
    setHasData(false);

};
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {hasData ? (
              <>
              <Link className="nav-link" to="/UserProfile" style={{ color: 'white' }}>User Profile</Link>
              <div  onClick={logoutHandler} style={{ color: 'white',cursor:'pointer'}} className='mt-2 ml-3'>
            Logout
        </div>
</>
            ) : (
              <>
                <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link>
                <Link className="nav-link active" aria-current="page" to="/UserSignup" style={{ color: 'white' }}>User Signup</Link>
                <Link className="nav-link" to="/UserLogin" style={{ color: 'white' }}>User Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
