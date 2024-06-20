import React, { useEffect, useState } from "react";
import { GetUserProfile } from "../service/AccountService";
import '../styles/style.css';
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profileInfor = async () => {
      const data = await GetUserProfile();
      setUserProfile(data?.data);
    };
    profileInfor();
  }, []);

  return (
    <div className="container mt-2">
    <div className="divstyle">
      <h3 className="mb-3">User Details</h3>
      {userProfile ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{userProfile.email}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{userProfile.username}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default UserProfile;
