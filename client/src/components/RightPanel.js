/**
 * RightPanel Component
 * Displays AI utility tools with beautiful cards
 */

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ChatBubbleOutline,
  Description,
  Article,
  Code,
  Image,
  TrendingUp,
  Info,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { aiTools, mockUser } from '../utils/mockData';

const StyledCard = styled(Card)(({ theme, gradient }) => ({
  background: gradient || theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.shadows[7],
    '&::before': {
      opacity: 0.1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
}));

const UsageCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const RightPanel = ({ collapsed }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    const icons = {
      ChatBubbleOutline: <ChatBubbleOutline />,
      Description: <Description />,
      Article: <Article />,
      Code: <Code />,
      Image: <Image />,
    };
    return icons[iconName] || <Info />;
  };

  const handleToolClick = (route) => {
    navigate(route);
  };

  // Collapsed view
  if (collapsed) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          gap: 2,
        }}
      >
        {aiTools.map((tool) => (
          <Tooltip key={tool.id} title={tool.title} placement="left">
            <IconButton
              onClick={() => handleToolClick(tool.route)}
              sx={{
                width: 40,
                height: 40,
                background: tool.gradient,
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: theme.shadows[6],
                },
                transition: 'all 0.2s',
              }}
              aria-label={tool.title}
            >
              {getIcon(tool.icon)}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    );
  }

  // Expanded view
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        p: 2,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'divider',
          borderRadius: '3px',
        },
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        ⚡ AI Tools
      </Typography>

      {/* Usage Stats */}
      {/* <UsageCard elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
            API Usage
          </Typography>
          <Chip
            label={mockUser.plan}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {mockUser.usage.requests}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              / {mockUser.usage.limit}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 8,
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${(mockUser.usage.requests / mockUser.usage.limit) * 100}%`,
                bgcolor: 'success.main',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUp fontSize="small" />
          Resets on {mockUser.usage.resetDate}
        </Typography>
      </UsageCard> */}

      <Divider sx={{ my: 2 }} />

      {/* AI Tools Grid */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
        }}
      >
        Quick Actions
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {aiTools.map((tool) => (
          <StyledCard
            key={tool.id}
            elevation={2}
            gradient={theme.palette.mode === 'dark' ? undefined : tool.gradient}
          >
            <CardActionArea
              onClick={() => handleToolClick(tool.route)}
              sx={{ p: 0 }}
              aria-label={`Open ${tool.title}`}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: theme.palette.mode === 'dark' ? tool.color : 'rgba(255,255,255,0.9)',
                      color: theme.palette.mode === 'dark' ? 'white' : tool.color,
                      boxShadow: theme.shadows[4],
                    }}
                  >
                    {getIcon(tool.icon)}
                  </Avatar>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: theme.palette.mode === 'dark' ? 'white' : 'white',
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.9)',
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      {tool.description}
                    </Typography>

                    {/* Features */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {tool.features.slice(0, 2).map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        ))}
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: 'background.surface',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Info fontSize="small" />
          <strong>Pro Tip:</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Use code mode (toggle with the <Code fontSize="small" sx={{ verticalAlign: 'middle' }} /> button) for better code formatting and syntax detection.
        </Typography>
      </Box>
    </Box>
  );
};

export default RightPanel;
