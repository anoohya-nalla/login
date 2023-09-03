import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  // Initialize accessToken state with an empty string
  const [accessToken, setAccessToken] = useState("");

  // Callback function to update accessToken when a user logs in
  const handleLogin = (token) => {
    setAccessToken(token); // Update accessToken state
  };

  return (
    <div className="App">
      <h1>React Login App</h1>
      <LoginForm onLogin={handleLogin} />
      {accessToken && <UserProfile accessToken={accessToken} />}
    </div>
  );
}

export default App;
