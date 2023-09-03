import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ accessToken }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Save user data to state
        setUserData(response.data);

        // Save user data to browser storage (localStorage)
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        // Handle errors
        console.error("Error fetching user profile", error);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcomeeeeeeeeeeee, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
