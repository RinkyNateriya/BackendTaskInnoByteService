import axios from "axios";
const baseUrl="http://localhost:8080/api/account"

async function SignUpService(userData) {
  try {
    const response = await axios.post(`${baseUrl}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = response.data;
      if (result.success && result.message === "Registration Successfull") {
        return result;
      }
      else if(result.success && result.message === "User Already Exist"){
       return result.message 
      }
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}



async function LoginService(userData) {
  try {
    const response = await axios.post(`${baseUrl}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = response?.data;
      if (result.success && result.message === "Login successful") {
        return result;
      }
      else if(result.success && result.message==="Email and Password combination does not match."){
        return null;
      }
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}


const getToken = async () => {
  try {
    const retrievedToken = await localStorage.getItem("AccessToken");
    if (retrievedToken !== null) {
      console.log("Token retrieved:", retrievedToken);
      return retrievedToken;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
};

async function GetUserProfile(userData={}) {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No access token found");
      }
      const response = await axios.post(`${baseUrl}/userProfile`, userData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`, // Include the token here
        },
      });
  
      if (response.status === 200) {
        const result = response.data;
        if (result.success) {
          return result;
        }
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }
  

  async function ConfirmationService(userData) {
    try {
      const response = await axios.post(`${baseUrl}/confirmation`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const result = response.data;
        if (result.success && result.message === "Confirmation Success") {
          return result;
        }  
      
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }


export { SignUpService, GetUserProfile,LoginService,ConfirmationService };
