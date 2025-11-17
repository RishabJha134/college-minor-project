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
import { Image as ImageIcon, Send } from "@mui/icons-material";
import { MinimalLoader } from "../components/Loader";
import { API } from "../api/axios";

const ScifiImage = () => {
  const theme = useTheme();
  const [text, settext] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter image description!");
      return;
    }

    setLoading(true);
    setError("");
    setImage("");
    const loadingToast = toast.loading("Generating sci-fi image... This may take a moment.");

    try {
      const { data } = await API.openai.scifiImage(text);
      console.log(data);
      if (data.image) {
        setImage(data.image);
        toast.success("Image generated!", { id: loadingToast });
      } else {
        throw new Error("No image was returned from the server");
      }
    } catch (err) {
      console.error("Image Generation Error:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to generate image";
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
          <ImageIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Sci-Fi Image Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create stunning sci-fi images with AI
            </Typography>
          </Box>
        </Box>

        <TextField
          placeholder="Describe your sci-fi image (e.g., 'futuristic city with flying cars at sunset')"
          type="text"
          multiline={true}
          required
          rows={4}
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
          {loading ? "Generating Image..." : "Generate Sci-Fi Image"}
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
          minHeight: loading ? "200px" : image ? "auto" : "400px",
          borderRadius: 2,
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "auto",
          p: image ? 2 : 3,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 2 }}>
            <MinimalLoader />
            <Typography color="text.secondary" textAlign="center">
              Creating your sci-fi masterpiece...
              <br />
              <Typography variant="caption" color="text.secondary">This may take up to 30 seconds</Typography>
            </Typography>
          </Box>
        ) : image ? (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight={600} color="primary.main">
                🎨 Generated Image
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "center",
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
                p: 2,
              }}
            >
              <img 
                src={image} 
                alt="Generated sci-fi artwork" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: theme.shadows[4],
                }} 
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 350, gap: 2 }}>
            <ImageIcon sx={{ fontSize: 80, color: 'action.disabled', opacity: 0.3 }} />
            <Typography variant="h6" color="text.secondary" textAlign="center">
              Your sci-fi image will appear here
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth="400px">
              Describe your vision above and click "Generate Sci-Fi Image" to bring it to life
            </Typography>
          </Box>
        )}
      </Card>
      </Box>
    </Box>
  );
};

export default ScifiImage;
