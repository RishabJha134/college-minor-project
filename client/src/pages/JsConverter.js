import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  CircularProgress,
} from "@mui/material";
import { Code, Send } from "@mui/icons-material";
import { MinimalLoader } from "../components/Loader";
import { API } from './../api/axios';

const JsConverter = () => {
  const theme = useTheme();
  const [text, settext] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter code to convert!");
      return;
    }

    setLoading(true);
    setError("");
    setCode("");
    const loadingToast = toast.loading("Converting code...");

    try {
      const { data } = await API.openai.jsConverter(text);
      console.log(data);
      setCode(data.code || data);
      toast.success("Code converted successfully!", { id: loadingToast });
    } catch (err) {
      console.error("JS Converter Error:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || "Failed to convert code";
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
        {/* Header with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Code sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              JavaScript Converter
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Convert code between different languages and formats
            </Typography>
          </Box>
        </Box>

        <TextField
          placeholder="Paste your code here (e.g., Python, Java, etc.)"
          type="text"
          multiline={true}
          required
          rows={12}
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          sx={{ 
            color: "white", 
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {loading ? "Converting..." : "Convert to JavaScript"}
        </Button>
        
        <Typography mt={2} color="text.secondary" textAlign="center">
          Not the right tool? <Link to="/" style={{ color: theme.palette.primary.main }}>Go Back</Link>
        </Typography>
      </form>

      {/* Response Card with Three States */}
      <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          minHeight: loading ? "200px" : code ? "auto" : "400px",
          maxHeight: "600px",
          borderRadius: 2,
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "auto",
          p: code ? 0 : 3,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 150, gap: 2, p: 3 }}>
            <MinimalLoader />
            <Typography color="text.secondary">Converting your code to JavaScript...</Typography>
          </Box>
        ) : code ? (
          <Box>
            <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)', px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight={600} color="primary.main">
                💻 Converted Code
              </Typography>
            </Box>
            <Box sx={{ p: 3, overflow: "auto" }}>
              <pre style={{ 
                margin: 0, 
                fontFamily: 'Consolas, Monaco, "Courier New", monospace', 
                fontSize: '0.9rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word' 
              }}>
                <code>{code}</code>
              </pre>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 350, gap: 2 }}>
            <Code sx={{ fontSize: 80, color: 'action.disabled', opacity: 0.3 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Your converted code will appear here
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth="400px">
              Paste your code above and click "Convert to JavaScript" to get started
            </Typography>
          </Box>
        )}
      </Card>
      </Box>
    </Box>
  );
};

export default JsConverter;
