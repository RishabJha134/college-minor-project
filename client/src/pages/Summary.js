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
import { Summarize, Send } from "@mui/icons-material";
import { MinimalLoader } from "../components/Loader";
import { API } from "../api/axios";

const Summary = () => {
  const theme = useTheme();
  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter text to summarize!");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    const loadingToast = toast.loading("Summarizing text...");

    try {
      const { data } = await API.openai.summary(text);
      console.log(data);
      setSummary(data.summary || data);
      toast.success("Summary generated!", { id: loadingToast });
    } catch (err) {
      console.error("Summary Error:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || "Failed to generate summary";
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
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      
      <form onSubmit={handleSubmit}>
        {/* Header with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Summarize sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Text Summarizer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get concise summaries of your text content
            </Typography>
          </Box>
        </Box>

        <TextField
          placeholder="Paste your text here to get a summary..."
          type="text"
          multiline={true}
          required
          rows={8}
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
          {loading ? "Summarizing..." : "Generate Summary"}
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
          minHeight: loading ? "200px" : summary ? "auto" : "400px",
          maxHeight: "600px",
          borderRadius: 2,
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "auto",
          p: 3,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 150, gap: 2 }}>
            <MinimalLoader />
            <Typography color="text.secondary">Analyzing and summarizing your text...</Typography>
          </Box>
        ) : summary ? (
          <Box>
            <Typography variant="h6" fontWeight={600} mb={2} color="primary.main">
              📝 Summary
            </Typography>
            <Typography variant="body1" lineHeight={1.8} sx={{ whiteSpace: 'pre-wrap' }}>
              {summary}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 350, gap: 2 }}>
            <Summarize sx={{ fontSize: 80, color: 'action.disabled', opacity: 0.3 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Your summary will appear here
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth="400px">
              Enter your text above and click "Generate Summary" to get started
            </Typography>
          </Box>
        )}
      </Card>
      </Box>
    </Box>
  );
};

export default Summary;
