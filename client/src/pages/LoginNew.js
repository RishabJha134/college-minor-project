/**
 * Enhanced Login Page with Premium SaaS Styling
 */

import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Collapse,
  Divider,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { API } from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.auth.login({ email, password });
      toast.success("Login successful! Welcome back 🎉");
      
      const token = response.data?.token || "true";
      login(token);
      
      navigate("/");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || err.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
      
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.slate?.[950] || theme.palette.background.paper} 100%)`,
        py: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #22d3ee 0%, #6366f1 100%)",
          },
        }}
      >
        {/* Logo/Icon */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              mb: 2,
              boxShadow: theme.shadows[6],
            }}
          >
            🚀
          </Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue to DevTinder AI
          </Typography>
        </Box>

        {/* Error Alert */}
        <Collapse in={!!error}>
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            {error}
          </Alert>
        </Collapse>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 3 }}>
          <Chip label="OR" size="small" />
        </Divider>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Typography
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create one now
            </Typography>
          </Typography>
        </Box>

        {/* Features */}
        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            ✨ What you'll get:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip label="💬 AI Chat" size="small" variant="outlined" />
            <Chip label="⚡ Code Conversion" size="small" variant="outlined" />
            <Chip label="📝 Text Summary" size="small" variant="outlined" />
            <Chip label="🎨 Image Generation" size="small" variant="outlined" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
