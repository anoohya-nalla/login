import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const UserProfile = ({ accessToken }) => {
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

        // Save user data to browser storage (localStorage)
        localStorage.setItem("userData", JSON.stringify(response.data));

        // Show a success toast message
        toast.success(
          <div>
            <p>Welcome, {response.data.name}!</p>
            <p>User profile loaded successfully!</p>
          </div>,
          { position: "bottom-right", icon: false }
        );
      } catch (error) {
        // Handle errors
        console.error("Error fetching user profile", error);

        // Show an error toast message
        toast.error("Error fetching user profile. Please try again later.");
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  return null;
};

export default UserProfile;
