import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import backgroundImage from "../assets/background.jpg";
import { Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
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
            position: "relative",
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
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "#fff",
              textAlign: "left",
              padding: "40px",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Mindia Admin Portal
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              From user management to content updates, analytics to
              monetization, our intuitive tools empower you to seamlessly
              oversee and optimize every aspect of your gaming ecosystem
            </Typography>
          </div>
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
        <Typography
          variant="body2"
          style={{ fontSize: "14px", color: "#1976d2", textAlign: "left" }}
        >
          Access your math project account using the credentials emailed to you
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            autoFocus={true}
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
              style={{ color: "#1976d2" }}
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label={
                <Typography variant="body1" style={{ fontSize: "15px" }}>
                  Remember me
                </Typography>
              }
            />
            <Link
              href="/forgot-password"
              variant="body2"
              style={{ textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </div>

          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </LoadingButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
