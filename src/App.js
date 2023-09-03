import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Initialize accessToken state with an empty string
  const [accessToken, setAccessToken] = useState("");

  // Callback function to update accessToken when a user logs in
  const handleLogin = (token) => {
    setAccessToken(token); // Update accessToken state
  };

  return (
    <div className="App">
      <LoginForm onLogin={handleLogin} />
      {accessToken && <UserProfile accessToken={accessToken} />}
      <ToastContainer />
    </div>
  );
}

export default App;
