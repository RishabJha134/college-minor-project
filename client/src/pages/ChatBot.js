import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  CircularProgress,
} from "@mui/material";
import { Send, SmartToy } from "@mui/icons-material";
import { MinimalLoader } from "../components/Loader";

const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter your message!");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    const loadingToast = toast.loading("AI is thinking...");

    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text });
      console.log(data);
      setResponse(data.answer || data);
      toast.success("Response generated successfully!", { id: loadingToast });
    } catch (err) {
      console.error("ChatBot Error:", err);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{ 
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        bgcolor: 'background.default',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'divider',
          borderRadius: '4px',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '48rem',
          margin: '0 auto',
          p: { xs: 2, md: 4 },
        }}
      >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <SmartToy sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>AI Chatbot</Typography>
            <Typography variant="body2" color="text.secondary">
              Ask me anything and I'll help you!
            </Typography>
          </Box>
        </Box>

        <TextField
          placeholder="Type your message here..."
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          rows={4}
          value={text}
          onChange={(e) => settext(e.target.value)}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
          sx={{ 
            mt: 2, 
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          {loading ? "Generating Response..." : "Send Message"}
        </Button>
        
        <Typography mt={2} textAlign="center">
          <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            ← Back to Dashboard
          </Link>
        </Typography>
      </form>

      {loading ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            minHeight: "300px",
            borderRadius: 2,
            borderColor: "divider",
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <MinimalLoader size={40} />
          <Typography color="text.secondary">AI is generating response...</Typography>
        </Card>
      ) : response ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            minHeight: "200px",
            maxHeight: "500px",
            borderRadius: 2,
            borderColor: "divider",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="primary.main" gutterBottom fontWeight={600}>
              🤖 AI Response:
            </Typography>
            <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.8 }}>
              {response}
            </Typography>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            minHeight: "300px",
            borderRadius: 2,
            borderColor: "divider",
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <SmartToy sx={{ fontSize: 60, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Response will appear here
            </Typography>
            <Typography variant="body2" color="text.disabled" mt={1}>
              Type your message and click send
            </Typography>
          </Box>
        </Card>
      )}
      </Box>
    </Box>
  );
};

export default ChatBot;
