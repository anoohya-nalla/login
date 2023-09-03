import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import backgroundImage from "../assets/background.jpg";
import { Checkbox, FormControlLabel, Link } from "@mui/material";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      const { access_token } = response.data;

      onLogin(access_token);

      // Clear the form fields and any previous error messages
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Please check your credentials.", {
        position: "bottom-right",
      });
    }
  };

  const isMobileScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Grid
      container
      style={{
        minHeight: "100vh",
      }}
    >
      {!isMobileScreen && (
        <Grid
          item
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <img
            src={backgroundImage}
            alt="Login"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
      )}

      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: isMobileScreen ? "20px" : "80px",
        }}
      >
        <h2>Login</h2>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
            label="Remember Me"
          />
          <Link href="/forgot-password" variant="body2">
            Forgot Password?
          </Link>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
