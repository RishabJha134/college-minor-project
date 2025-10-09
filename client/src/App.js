import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import Paragraph from "./pages/Paragraph";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import ScifiImage from "./pages/ScifiImage";

function AppContent() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const { isAuthenticated } = useAuth();

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Toaster />
      <Routes>
        {/* Protected Routes - Only accessible when authenticated */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/paragraph" element={<Paragraph />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/js-converter" element={<JsConverter />} />
            <Route path="/scifi-image" element={<ScifiImage />} />
            {/* Redirect login/register to home if already authenticated */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {/* Public Routes - Only accessible when not authenticated */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Redirect all other routes to register if not authenticated */}
            <Route path="*" element={<Navigate to="/register" replace />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
