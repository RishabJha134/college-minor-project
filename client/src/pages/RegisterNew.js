/**
 * Enhanced Register Page with Premium SaaS Styling
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
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  HowToReg,
} from "@mui/icons-material";
import { API } from "../api/axios";
import toast from "react-hot-toast";
import { isValidEmail } from "../utils/helpers";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z\d]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthColor = (strength) => {
    if (strength < 40) return "error";
    if (strength < 70) return "warning";
    return "success";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await API.auth.register(formData);
      toast.success("Account created successfully! 🎉");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || err.message || "Registration failed";
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
            Get Started
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your DevTinder AI account
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

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
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
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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

            <Box>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
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
              {formData.password && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Password strength
                    </Typography>
                    <Typography
                      variant="caption"
                      color={`${getStrengthColor(passwordStrength)}.main`}
                      fontWeight={600}
                    >
                      {passwordStrength < 40 ? "Weak" : passwordStrength < 70 ? "Medium" : "Strong"}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    color={getStrengthColor(passwordStrength)}
                    sx={{ borderRadius: 1, height: 6 }}
                  />
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={<HowToReg />}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 3 }}>
          <Chip label="OR" size="small" />
        </Divider>

        {/* Sign In Link */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Typography
              component={RouterLink}
              to="/login"
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
              Sign in here
            </Typography>
          </Typography>
        </Box>

        {/* Terms */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 3 }}
        >
          By creating an account, you agree to our{" "}
          <Typography component="span" variant="caption" color="primary.main">
            Terms of Service
          </Typography>{" "}
          and{" "}
          <Typography component="span" variant="caption" color="primary.main">
            Privacy Policy
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
