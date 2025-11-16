/**
 * MessageComposer Component
 * Advanced message input with code mode, multiline support, and keyboard shortcuts
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Send,
  AttachFile,
  Code,
  Image,
  Mic,
  EmojiEmotions,
  Settings,
  KeyboardCommandKey,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const ComposerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));

const StyledTextField = styled(TextField)(({ theme, codeMode }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5), // Reduced border radius for ChatGPT look
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : theme.palette.background.surface,
    fontFamily: codeMode ? theme.typography.code.fontFamily : 'inherit',
    transition: 'all 0.3s ease',
    border: '1px solid',
    borderColor: theme.palette.divider,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : theme.palette.background.elevated,
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : theme.palette.divider,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : theme.palette.background.elevated,
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '0px', // Hide default border when using custom border
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove default border
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 2),
    fontSize: codeMode ? '0.875rem' : '1rem',
  },
}));

const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  gap: theme.spacing(1),
}));

const MessageComposer = ({ onSendMessage, disabled = false, placeholder }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [codeMode, setCodeMode] = useState(false);
  const [rows, setRows] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const textFieldRef = useRef(null);

  // Auto-adjust rows based on content
  useEffect(() => {
    const lineCount = message.split('\n').length;
    setRows(Math.min(Math.max(lineCount, 1), 10));
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setRows(1);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    // Shift + Enter for new line (default behavior)
    // Enter alone for new line (can be customized)
  };

  const toggleCodeMode = () => {
    setCodeMode(!codeMode);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const insertTemplate = (template) => {
    setMessage(template);
    handleCloseMenu();
    textFieldRef.current?.focus();
  };

  const templates = [
    {
      label: 'Explain Code',
      icon: <Code />,
      template: 'Can you explain this code:\n\n```javascript\n// Paste your code here\n```',
    },
    {
      label: 'Debug Code',
      icon: <Code />,
      template: 'I have a bug in my code. Here it is:\n\n```javascript\n// Paste your code here\n```\n\nThe error is: ',
    },
    {
      label: 'Convert Code',
      icon: <Code />,
      template: 'Convert this Python code to JavaScript:\n\n```python\n# Paste your Python code here\n```',
    },
    {
      label: 'Summarize Text',
      icon: <EmojiEmotions />,
      template: 'Summarize the following text:\n\n',
    },
  ];

  return (
    <ComposerContainer>
      {/* Mode Indicator */}
      {codeMode && (
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label="Code Mode"
            icon={<Code />}
            size="small"
            color="primary"
            onDelete={toggleCodeMode}
            sx={{ fontFamily: theme.typography.code.fontFamily }}
          />
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <KeyboardCommandKey fontSize="small" />
                <span>+ Enter to send</span>
              </Box>
            }
            size="small"
            variant="outlined"
          />
        </Box>
      )}

      {/* Text Input */}
      <Box sx={{ position: 'relative' }}>
        <StyledTextField
          ref={textFieldRef}
          fullWidth
          multiline
          rows={rows}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder || codeMode
              ? 'Type or paste your code here...'
              : 'Type your message... (Ctrl+Enter to send)'
          }
          disabled={disabled}
          codeMode={codeMode}
          inputProps={{
            'aria-label': 'Message input',
            maxLength: 10000,
          }}
        />

        {/* Send Button (Overlay) */}
        <IconButton
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            bgcolor: disabled && message.trim() ? 'action.disabledBackground' : 'primary.main',
            color: 'primary.contrastText',
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: disabled ? 'action.disabledBackground' : 'primary.dark',
              transform: disabled ? 'none' : 'scale(1.05)',
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            transition: 'all 0.2s',
            boxShadow: theme.shadows[6],
          }}
          aria-label="Send message"
        >
          {disabled && message.trim() ? <CircularProgress size={20} color="inherit" /> : <Send />}
        </IconButton>
      </Box>

      {/* Action Bar */}
      <ActionBar>
        {/* Left Actions */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Code Mode">
            <IconButton
              size="small"
              onClick={toggleCodeMode}
              sx={{
                color: codeMode ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Toggle code mode"
            >
              <Code fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Attach File">
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Attach file"
            >
              <AttachFile fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Image">
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Add image"
            >
              <Image fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Voice Input">
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Voice input"
            >
              <Mic fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Templates">
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Message templates"
            >
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`${message.length} / 10000`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 24,
              color: message.length > 9000 ? 'warning.main' : 'text.secondary',
              borderColor: message.length > 9000 ? 'warning.main' : 'divider',
            }}
          />
        </Box>
      </ActionBar>

      {/* Templates Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            minWidth: 250,
            borderRadius: 2,
            boxShadow: theme.shadows[4],
          },
        }}
      >
        {templates.map((template, index) => (
          <MenuItem
            key={index}
            onClick={() => insertTemplate(template.template)}
            sx={{
              py: 1.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>{template.icon}</ListItemIcon>
            <ListItemText primary={template.label} />
          </MenuItem>
        ))}
      </Menu>
    </ComposerContainer>
  );
};

export default MessageComposer;
