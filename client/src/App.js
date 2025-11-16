import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { FullScreenLoader } from "./components/Loader";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterNew";
import Login from "./pages/LoginNew";
import Summary from "./pages/Summary";
import Paragraph from "./pages/Paragraph";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import ScifiImage from "./pages/ScifiImage";

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return <FullScreenLoader message="Initializing AI-VERSE AI..." />;
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
        </Box>
      </Box>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
