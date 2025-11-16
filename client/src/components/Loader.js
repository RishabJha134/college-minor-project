/**
 * Reusable Loader Component
 * Beautiful, animated loading spinner with multiple variants
 */

import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled, keyframes } from '@mui/material/styles';

// Gradient animation for the loader
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoaderContainer = styled(Box)(({ theme, fullscreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  ...(fullscreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(15, 23, 42, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    zIndex: 9999,
    backdropFilter: 'blur(10px)',
  }),
}));

const GradientCircle = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #ec4899 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 2s ease infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[8],
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
  },
}));

const Loader = ({ 
  size = 40, 
  fullscreen = false, 
  message = 'Loading...', 
  variant = 'gradient' // 'gradient', 'simple', 'minimal'
}) => {
  const theme = useTheme();

  if (variant === 'minimal') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={size} thickness={4} />
      </Box>
    );
  }

  if (variant === 'simple') {
    return (
      <LoaderContainer fullscreen={fullscreen}>
        <CircularProgress 
          size={size} 
          thickness={4}
          sx={{
            color: 'primary.main',
          }}
        />
        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </LoaderContainer>
    );
  }

  // Gradient variant (default)
  return (
    <Fade in={true} timeout={300}>
      <LoaderContainer fullscreen={fullscreen}>
        <Box sx={{ position: 'relative' }}>
          <GradientCircle />
          <CircularProgress
            size={60}
            thickness={2}
            sx={{
              color: 'transparent',
              position: 'absolute',
              top: 0,
              left: 0,
              '& .MuiCircularProgress-circle': {
                stroke: 'url(#gradient)',
                strokeLinecap: 'round',
              },
            }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </Box>

        {message && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {message}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                },
              }}
            />
          ))}
        </Box>
      </LoaderContainer>
    </Fade>
  );
};

export default Loader;

// Export different loader variants for convenience
export const FullScreenLoader = ({ message }) => (
  <Loader fullscreen={true} message={message} variant="gradient" />
);

export const SimpleLoader = ({ message, size }) => (
  <Loader message={message} size={size} variant="simple" fullscreen={false} />
);

export const MinimalLoader = ({ size = 24 }) => (
  <Loader size={size} variant="minimal" />
);
