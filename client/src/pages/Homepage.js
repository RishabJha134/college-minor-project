import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  useTheme,
  alpha,
  IconButton,
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import {
  AutoAwesome,
  Code,
  Speed,
  Psychology,
  TrendingUp,
  Security,
  CloudDone,
  Lightbulb,
  Chat,
  Transform,
  Summarize,
  Image as ImageIcon,
  ArrowForward,
  CheckCircle,
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Twitter,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const features = [
    {
      icon: <Chat sx={{ fontSize: 40 }} />,
      title: "AI ChatBot",
      description:
        "Interactive conversation with AI assistant. Get instant answers and code assistance with advanced natural language understanding.",
      color: theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
      tags: ["Code assistance", "Q&A"],
      route: "/chatbot",
    },
    {
      icon: <Transform sx={{ fontSize: 40 }} />,
      title: "JS Code Converter",
      description:
        "Convert Simple English to JavaScript very fast and efficient.",
      color: theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
      tags: ["Multi-language", "Instant"],
      route: "/js-converter",
    },
    {
      icon: <Summarize sx={{ fontSize: 40 }} />,
      title: "Text Summarizer",
      description:
        "Condense long texts into concise summaries. Extract key points and main ideas efficiently.",
      color: theme.palette.mode === "dark" ? "#34d399" : "#059669",
      tags: ["Key points", "Article summary"],
      route: "/summary",
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40 }} />,
      title: "Paragraph Generator",
      description:
        "Generate coherent paragraphs from keywords. Perfect for content creation and idea expansion.",
      color: theme.palette.mode === "dark" ? "#fb923c" : "#ea580c",
      tags: ["Content creation", "SEO"],
      route: "/paragraph",
    },
    {
      icon: <ImageIcon sx={{ fontSize: 40 }} />,
      title: "AI Image Generation",
      description:
        "Create stunning sci-fi images from text descriptions. Powered by advanced AI models.",
      color: theme.palette.mode === "dark" ? "#f472b6" : "#db2777",
      tags: ["Creative", "High-quality"],
      route: "/scifi-image",
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: "Smart AI Models",
      description:
        "Multiple AI models at your fingertips. Choose the best model for your specific task.",
      color: theme.palette.mode === "dark" ? "#a78bfa" : "#7c3aed",
      tags: ["Flexible", "Powerful"],
      route: "/chatbot",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "1M+", label: "AI Requests" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const benefits = [
    {
      icon: <Speed />,
      title: "Lightning Fast",
      description: "Get instant responses powered by cutting-edge AI technology",
    },
    {
      icon: <Security />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared with third parties",
    },
    {
      icon: <CloudDone />,
      title: "Cloud Based",
      description: "Access your tools anywhere, anytime, on any device",
    },
    {
      icon: <TrendingUp />,
      title: "Always Improving",
      description: "Regular updates with new features and enhanced capabilities",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            theme.palette.mode === "dark"
              ? `radial-gradient(ellipse at top, ${alpha("#1e293b", 0.9)} 0%, ${alpha("#0f172a", 1)} 50%, #000000 100%)`
              : `radial-gradient(ellipse at top, ${alpha("#e0e7ff", 0.5)} 0%, ${alpha("#f8fafc", 1)} 50%, #ffffff 100%)`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              theme.palette.mode === "dark"
                ? `radial-gradient(circle at 15% 20%, ${alpha("#22d3ee", 0.15)} 0%, transparent 40%),
                   radial-gradient(circle at 85% 10%, ${alpha("#818cf8", 0.15)} 0%, transparent 40%),
                   radial-gradient(circle at 50% 80%, ${alpha("#34d399", 0.1)} 0%, transparent 40%),
                   radial-gradient(circle at 90% 90%, ${alpha("#f472b6", 0.12)} 0%, transparent 40%)`
                : `radial-gradient(circle at 15% 20%, ${alpha("#0891b2", 0.08)} 0%, transparent 40%),
                   radial-gradient(circle at 85% 10%, ${alpha("#4f46e5", 0.08)} 0%, transparent 40%),
                   radial-gradient(circle at 50% 80%, ${alpha("#059669", 0.06)} 0%, transparent 40%)`,
            pointerEvents: "none",
            animation: "pulse 8s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.8 },
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              theme.palette.mode === "dark"
                ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)'
                : 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(8, 145, 178, 0.02) 2px, rgba(8, 145, 178, 0.02) 4px)',
            pointerEvents: "none",
          },
          py: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: "relative", 
                  zIndex: 1,
                  animation: "fadeInUp 0.8s ease-out",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(30px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Chip
                  icon={<AutoAwesome sx={{ fontSize: 16 }} />}
                  label="🚀 AI-Powered Platform"
                  sx={{
                    mb: 3,
                    bgcolor: alpha(
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      0.15
                    ),
                    backdropFilter: "blur(10px)",
                    color:
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                    border: `1px solid ${alpha(
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      0.4
                    )}`,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    py: 2.5,
                    px: 1,
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      0.2
                    )}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 16px ${alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.3
                      )}`,
                    },
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.5rem", lg: "5rem" },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 3,
                    letterSpacing: "-0.02em",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #ffffff 0%, #22d3ee 40%, #818cf8 70%, #a78bfa 100%)"
                        : "linear-gradient(135deg, #0f172a 0%, #0891b2 40%, #4f46e5 70%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: theme.palette.mode === "dark" 
                      ? `0 0 80px ${alpha("#22d3ee", 0.3)}`
                      : "none",
                  }}
                >
                  Transform Your Ideas with AI Magic
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 5,
                    color: "text.secondary",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    maxWidth: "90%",
                  }}
                >
                  Unleash the power of artificial intelligence with our comprehensive suite of tools. From code conversion to creative content generation — all in one platform.
                </Typography>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)"
                          : "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
                      color: theme.palette.mode === "dark" ? "#0f172a" : "#fff",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      boxShadow: theme.palette.mode === "dark"
                        ? `0 8px 24px ${alpha("#22d3ee", 0.4)}, 0 0 0 1px ${alpha("#22d3ee", 0.1)} inset`
                        : `0 8px 24px ${alpha("#0891b2", 0.3)}`,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: theme.palette.mode === "dark"
                          ? `0 12px 32px ${alpha("#22d3ee", 0.5)}`
                          : `0 12px 32px ${alpha("#0891b2", 0.4)}`,
                        "&::before": {
                          left: "100%",
                        },
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      borderWidth: 2,
                      borderColor:
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      color:
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      backdropFilter: "blur(10px)",
                      bgcolor: alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.05
                      ),
                      "&:hover": {
                        borderWidth: 2,
                        borderColor:
                          theme.palette.mode === "dark" ? "#06b6d4" : "#0e7490",
                        bgcolor: alpha(
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                          0.15
                        ),
                        transform: "translateY(-3px)",
                        boxShadow: `0 8px 20px ${alpha(
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                          0.2
                        )}`,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Explore Features
                  </Button>
                </Box>
                
                {/* Trust Indicators */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle sx={{ color: theme.palette.mode === "dark" ? "#34d399" : "#059669", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      No credit card required
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle sx={{ color: theme.palette.mode === "dark" ? "#34d399" : "#059669", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Free forever plan
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle sx={{ color: theme.palette.mode === "dark" ? "#34d399" : "#059669", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Cancel anytime
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: "fadeInRight 1s ease-out",
                  "@keyframes fadeInRight": {
                    "0%": { opacity: 0, transform: "translateX(30px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                  },
                }}
              >
                {/* Glassmorphism Background Card */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "85%",
                    height: "85%",
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${alpha("#22d3ee", 0.1)} 0%, ${alpha("#818cf8", 0.1)} 100%)`
                        : `linear-gradient(135deg, ${alpha("#0891b2", 0.08)} 0%, ${alpha("#4f46e5", 0.08)} 100%)`,
                    backdropFilter: "blur(20px)",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    border: `1px solid ${alpha(
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      0.2
                    )}`,
                    boxShadow: theme.palette.mode === "dark"
                      ? `0 8px 32px ${alpha("#22d3ee", 0.15)}, inset 0 0 40px ${alpha("#22d3ee", 0.05)}`
                      : `0 8px 32px ${alpha("#0891b2", 0.12)}`,
                    animation: "morphing 8s ease-in-out infinite",
                    "@keyframes morphing": {
                      "0%, 100%": {
                        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                      },
                      "25%": {
                        borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%",
                      },
                      "50%": {
                        borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%",
                      },
                      "75%": {
                        borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%",
                      },
                    },
                  }}
                />
                
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 550,
                    aspectRatio: "1/1",
                  }}
                >
                  {/* Outer Gradient Ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "95%",
                      height: "95%",
                      border: `3px solid transparent`,
                      backgroundImage:
                        theme.palette.mode === "dark"
                          ? `linear-gradient(#0f172a, #0f172a), linear-gradient(135deg, #22d3ee, #818cf8, #a78bfa)`
                          : `linear-gradient(#fff, #fff), linear-gradient(135deg, #0891b2, #4f46e5, #7c3aed)`,
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      borderRadius: "50%",
                      animation: "spin 25s linear infinite",
                      filter: `drop-shadow(0 0 20px ${alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.4
                      )})`,
                      "@keyframes spin": {
                        "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
                        "100%": {
                          transform: "translate(-50%, -50%) rotate(360deg)",
                        },
                      },
                    }}
                  />
                  
                  {/* Middle Ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "75%",
                      height: "75%",
                      border: `2px dashed ${alpha(
                        theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                        0.4
                      )}`,
                      borderRadius: "50%",
                      animation: "spin-reverse 18s linear infinite",
                      filter: `drop-shadow(0 0 15px ${alpha(
                        theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                        0.3
                      )})`,
                      "@keyframes spin-reverse": {
                        "0%": {
                          transform: "translate(-50%, -50%) rotate(360deg)",
                        },
                        "100%": {
                          transform: "translate(-50%, -50%) rotate(0deg)",
                        },
                      },
                    }}
                  />
                  
                  {/* Inner Glow Ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "50%",
                      height: "50%",
                      borderRadius: "50%",
                      background:
                        theme.palette.mode === "dark"
                          ? `radial-gradient(circle, ${alpha("#22d3ee", 0.3)} 0%, transparent 70%)`
                          : `radial-gradient(circle, ${alpha("#0891b2", 0.2)} 0%, transparent 70%)`,
                      animation: "pulse-glow 3s ease-in-out infinite",
                      "@keyframes pulse-glow": {
                        "0%, 100%": { 
                          transform: "translate(-50%, -50%) scale(1)",
                          opacity: 0.6,
                        },
                        "50%": { 
                          transform: "translate(-50%, -50%) scale(1.1)",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  
                  {/* Center Icon with Glassmorphism */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        theme.palette.mode === "dark"
                          ? `linear-gradient(135deg, ${alpha("#22d3ee", 0.25)} 0%, ${alpha("#06b6d4", 0.15)} 100%)`
                          : `linear-gradient(135deg, ${alpha("#0891b2", 0.15)} 0%, ${alpha("#0e7490", 0.1)} 100%)`,
                      backdropFilter: "blur(10px)",
                      border: `4px solid ${alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.5
                      )}`,
                      boxShadow: theme.palette.mode === "dark"
                        ? `0 0 60px ${alpha("#22d3ee", 0.6)}, 0 0 100px ${alpha("#22d3ee", 0.3)}, inset 0 0 20px ${alpha("#22d3ee", 0.2)}`
                        : `0 0 60px ${alpha("#0891b2", 0.4)}, 0 0 100px ${alpha("#0891b2", 0.2)}`,
                      animation: "float-center 4s ease-in-out infinite",
                      "@keyframes float-center": {
                        "0%, 100%": { transform: "translate(-50%, -50%) translateY(0)" },
                        "50%": { transform: "translate(-50%, -50%) translateY(-10px)" },
                      },
                    }}
                  >
                    <AutoAwesome
                      sx={{
                        fontSize: 70,
                        color:
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        filter: `drop-shadow(0 0 10px ${alpha(
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                          0.8
                        )})`,
                        animation: "rotate-sparkle 6s linear infinite",
                        "@keyframes rotate-sparkle": {
                          "0%, 100%": { transform: "rotate(0deg)" },
                          "50%": { transform: "rotate(180deg)" },
                        },
                      }}
                    />
                  </Box>
                  {/* Floating Feature Icons with Glassmorphism */}
                  {[
                    { icon: <Code />, angle: 0, color: "#22d3ee", label: "Code" },
                    { icon: <Psychology />, angle: 60, color: "#818cf8", label: "AI" },
                    { icon: <Lightbulb />, angle: 120, color: "#fb923c", label: "Ideas" },
                    { icon: <ImageIcon />, angle: 180, color: "#f472b6", label: "Images" },
                    { icon: <Summarize />, angle: 240, color: "#34d399", label: "Summary" },
                    { icon: <Transform />, angle: 300, color: "#a78bfa", label: "Convert" },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 75,
                        height: 75,
                        transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-220px) rotate(-${item.angle}deg)`,
                        background:
                          theme.palette.mode === "dark"
                            ? `linear-gradient(135deg, ${alpha(item.color, 0.25)} 0%, ${alpha(item.color, 0.15)} 100%)`
                            : `linear-gradient(135deg, ${alpha(item.color, 0.15)} 0%, ${alpha(item.color, 0.08)} 100%)`,
                        backdropFilter: "blur(10px)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `2px solid ${alpha(item.color, 0.6)}`,
                        boxShadow: `0 4px 20px ${alpha(item.color, 0.3)}, inset 0 0 10px ${alpha(item.color, 0.1)}`,
                        animation: `float-icon-${index} 4s ease-in-out infinite`,
                        animationDelay: `${index * 0.3}s`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-230px) rotate(-${item.angle}deg) scale(1.1)`,
                          boxShadow: `0 6px 30px ${alpha(item.color, 0.5)}`,
                        },
                        [`@keyframes float-icon-${index}`]: {
                          "0%, 100%": { 
                            transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-220px) rotate(-${item.angle}deg)`,
                          },
                          "50%": { 
                            transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-240px) rotate(-${item.angle}deg) scale(1.05)`,
                          },
                        },
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: { 
                          fontSize: 36, 
                          color: item.color,
                          filter: `drop-shadow(0 0 8px ${alpha(item.color, 0.6)})`,
                        },
                      })}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Scroll Indicator */}
          <Box
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            sx={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              zIndex: 10,
              animation: "bounce-glow 2s ease-in-out infinite",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateX(-50%) scale(1.1)",
              },
              "@keyframes bounce-glow": {
                "0%, 100%": { 
                  transform: "translateX(-50%) translateY(0)",
                  filter: `drop-shadow(0 0 10px ${alpha(
                    theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                    0.3
                  )})`,
                },
                "50%": { 
                  transform: "translateX(-50%) translateY(12px)",
                  filter: `drop-shadow(0 0 20px ${alpha(
                    theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                    0.6
                  )})`,
                },
              },
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Discover More
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(
                  theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                  0.1
                ),
                border: `2px solid ${alpha(
                  theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                  0.4
                )}`,
              }}
            >
              <KeyboardArrowDown 
                sx={{ 
                  color: theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                  fontSize: 24,
                }} 
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      {/* <Box
        sx={{
          py: 6,
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha("#1e293b", 0.5)
              : alpha("#e0e7ff", 0.3),
          borderTop: `1px solid ${
            theme.palette.mode === "dark"
              ? alpha("#22d3ee", 0.1)
              : alpha("#0891b2", 0.1)
          }`,
          borderBottom: `1px solid ${
            theme.palette.mode === "dark"
              ? alpha("#22d3ee", 0.1)
              : alpha("#0891b2", 0.1)
          }`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)"
                          : "linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          py: 12,
          bgcolor: "background.default",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: "40%",
            height: "60%",
            background:
              theme.palette.mode === "dark"
                ? `radial-gradient(circle, ${alpha("#818cf8", 0.08)} 0%, transparent 70%)`
                : `radial-gradient(circle, ${alpha("#4f46e5", 0.05)} 0%, transparent 70%)`,
            pointerEvents: "none",
            animation: "float-blob 20s ease-in-out infinite",
            "@keyframes float-blob": {
              "0%, 100%": { transform: "translate(0, 0)" },
              "50%": { transform: "translate(-50px, 50px)" },
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            width: "40%",
            height: "60%",
            background:
              theme.palette.mode === "dark"
                ? `radial-gradient(circle, ${alpha("#22d3ee", 0.08)} 0%, transparent 70%)`
                : `radial-gradient(circle, ${alpha("#0891b2", 0.05)} 0%, transparent 70%)`,
            pointerEvents: "none",
            animation: "float-blob-reverse 20s ease-in-out infinite",
            "@keyframes float-blob-reverse": {
              "0%, 100%": { transform: "translate(0, 0)" },
              "50%": { transform: "translate(50px, -50px)" },
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label="✨ Powerful Features"
              sx={{
                mb: 3,
                bgcolor: alpha(
                  theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                  0.1
                ),
                color: theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                border: `1px solid ${alpha(
                  theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                  0.3
                )}`,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #22d3ee 100%)"
                    : "linear-gradient(135deg, #0f172a 0%, #0891b2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Powerful AI Tools
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}
            >
              Everything you need to boost your productivity and creativity with
              cutting-edge AI technology
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                lg={4} 
                key={index}
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(30px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Card
                  onClick={() => navigate(feature.route)}
                  sx={{
                    height: "100%",
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${alpha("#1e293b", 0.8)} 0%, ${alpha("#0f172a", 0.9)} 100%)`
                        : `linear-gradient(135deg, ${alpha("#ffffff", 0.9)} 0%, ${alpha("#f8fafc", 0.95)} 100%)`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(feature.color, 0.2)}`,
                    borderRadius: 4,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${feature.color}, ${alpha(feature.color, 0.5)})`,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: `0 20px 60px ${alpha(feature.color, 0.35)}, 0 0 0 1px ${alpha(feature.color, 0.2)}`,
                      borderColor: alpha(feature.color, 0.5),
                      "&::before": {
                        transform: "scaleX(1)",
                      },
                      "& .feature-icon-box": {
                        transform: "scale(1.1) rotate(5deg)",
                        boxShadow: `0 8px 20px ${alpha(feature.color, 0.4)}`,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                    <Box
                      className="feature-icon-box"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${alpha(feature.color, 0.2)} 0%, ${alpha(feature.color, 0.1)} 100%)`,
                        border: `2px solid ${alpha(feature.color, 0.4)}`,
                        mb: 3,
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "-50%",
                          left: "-50%",
                          width: "200%",
                          height: "200%",
                          background: `radial-gradient(circle, ${alpha(feature.color, 0.3)} 0%, transparent 70%)`,
                          animation: "rotate-gradient 4s linear infinite",
                          "@keyframes rotate-gradient": {
                            "0%": { transform: "rotate(0deg)" },
                            "100%": { transform: "rotate(360deg)" },
                          },
                        },
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: { 
                          fontSize: 44, 
                          color: feature.color,
                          position: "relative",
                          zIndex: 1,
                          filter: `drop-shadow(0 2px 8px ${alpha(feature.color, 0.4)})`,
                        },
                      })}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      {feature.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: alpha(feature.color, 0.1),
                            color: feature.color,
                            fontWeight: 600,
                            border: `1px solid ${alpha(feature.color, 0.3)}`,
                          }}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="text"
                      endIcon={<ArrowForward />}
                      sx={{
                        color: feature.color,
                        fontWeight: 600,
                        textTransform: "none",
                        p: 0,
                        "&:hover": {
                          bgcolor: "transparent",
                          "& .MuiSvgIcon-root": {
                            transform: "translateX(4px)",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          transition: "transform 0.3s ease",
                        },
                      }}
                    >
                      Try it now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box
        sx={{
          py: 12,
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha("#1e293b", 0.5)
              : alpha("#f8fafc", 0.5),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #818cf8 100%)"
                    : "linear-gradient(135deg, #0f172a 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Why Choose AI-VERSE AI?
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? alpha("#22d3ee", 0.1)
                          : alpha("#0891b2", 0.1),
                      border: `2px solid ${alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.3
                      )}`,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {React.cloneElement(benefit.icon, {
                      sx: {
                        fontSize: 40,
                        color:
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      },
                    })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box
        id="about"
        sx={{
          py: 12,
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: 4,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 20,
                    left: 20,
                    right: -20,
                    bottom: -20,
                    border: `2px solid ${alpha(
                      theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      0.3
                    )}`,
                    borderRadius: 4,
                    zIndex: 0,
                  },
                }}
              >
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    position: "relative",
                    zIndex: 1,
                    bgcolor: "background.paper",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? alpha("#22d3ee", 0.2)
                        : alpha("#0891b2", 0.2)
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor:
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      }}
                    >
                      <AutoAwesome sx={{ fontSize: 35 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        AI-VERSE AI
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        AI Utility Platform
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                      "Multiple AI-powered tools in one platform",
                      "Advanced natural language processing",
                      "Real-time code conversion & generation",
                      "Secure and privacy-focused architecture",
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 1.5 }}>
                        <CheckCircle
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#34d399"
                                : "#059669",
                            fontSize: 24,
                          }}
                        />
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 800,
                  mb: 3,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #22d3ee 100%)"
                      : "linear-gradient(135deg, #0f172a 0%, #0891b2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                About AI-VERSE AI
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                AI-VERSE AI is a comprehensive AI utility platform designed to
                empower developers, content creators, and professionals with
                cutting-edge artificial intelligence tools. Our mission is to
                make advanced AI technology accessible and easy to use for
                everyone.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                From intelligent chatbots to code converters, text summarizers to
                image generators, we provide a suite of tools that streamline
                your workflow and boost your productivity. Built with modern
                technologies and powered by state-of-the-art AI models, AI-VERSE
                AI is your go-to platform for all AI needs.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
              >
                Join thousands of users who trust AI-VERSE AI for their daily
                tasks and creative projects. Experience the future of AI-assisted
                development and content creation today.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          py: 12,
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha("#1e293b", 0.5)
              : alpha("#f8fafc", 0.5),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #818cf8 100%)"
                    : "linear-gradient(135deg, #0f172a 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  bgcolor: "background.paper",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? alpha("#22d3ee", 0.1)
                      : alpha("#0891b2", 0.1)
                  }`,
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? alpha("#22d3ee", 0.1)
                            : alpha("#0891b2", 0.1),
                        border: `2px solid ${alpha(
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                          0.3
                        )}`,
                      }}
                    >
                      <Email
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        support@AI-VERSEai.com
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        info@AI-VERSEai.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? alpha("#818cf8", 0.1)
                            : alpha("#4f46e5", 0.1),
                        border: `2px solid ${alpha(
                          theme.palette.mode === "dark" ? "#818cf8" : "#4f46e5",
                          0.3
                        )}`,
                      }}
                    >
                      <Phone
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#818cf8"
                              : "#4f46e5",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Phone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +91 1234 5678 125
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mon-Fri, 9AM-6PM IST
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? alpha("#34d399", 0.1)
                            : alpha("#059669", 0.1),
                        border: `2px solid ${alpha(
                          theme.palette.mode === "dark" ? "#34d399" : "#059669",
                          0.3
                        )}`,
                      }}
                    >
                      <LocationOn
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#34d399"
                              : "#059669",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                        Location
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        New Delhi
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        India
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: "divider" }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={2}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {[
                      { icon: <GitHub />, color: "#333" },
                      { icon: <LinkedIn />, color: "#0077b5" },
                      { icon: <Twitter />, color: "#1da1f2" },
                    ].map((social, idx) => (
                      <IconButton
                        key={idx}
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? alpha(social.color, 0.1)
                              : alpha(social.color, 0.05),
                          border: `2px solid ${alpha(social.color, 0.3)}`,
                          "&:hover": {
                            bgcolor: alpha(social.color, 0.2),
                            transform: "translateY(-3px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {React.cloneElement(social.icon, {
                          sx: { color: social.color },
                        })}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  bgcolor: "background.paper",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? alpha("#22d3ee", 0.1)
                      : alpha("#0891b2", 0.1)
                  }`,
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Send us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#22d3ee"
                              : "#0891b2",
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                      color: theme.palette.mode === "dark" ? "#0f172a" : "#fff",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: `0 4px 14px 0 ${alpha(
                        theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                        0.4
                      )}`,
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark" ? "#06b6d4" : "#0e7490",
                        boxShadow: `0 6px 20px 0 ${alpha(
                          theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                          0.5
                        )}`,
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${alpha("#22d3ee", 0.1)} 0%, ${alpha(
                  "#818cf8",
                  0.1
                )} 100%)`
              : `linear-gradient(135deg, ${alpha("#0891b2", 0.1)} 0%, ${alpha(
                  "#4f46e5",
                  0.1
                )} 100%)`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 3,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #22d3ee 100%)"
                    : "linear-gradient(135deg, #0f172a 0%, #0891b2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Join thousands of users and experience the power of AI-driven
              productivity tools. Start for free, no credit card required.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                color: theme.palette.mode === "dark" ? "#0f172a" : "#fff",
                px: 5,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                boxShadow: `0 8px 24px 0 ${alpha(
                  theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                  0.4
                )}`,
                "&:hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#06b6d4" : "#0e7490",
                  boxShadow: `0 12px 32px 0 ${alpha(
                    theme.palette.mode === "dark" ? "#22d3ee" : "#0891b2",
                    0.5
                  )}`,
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
