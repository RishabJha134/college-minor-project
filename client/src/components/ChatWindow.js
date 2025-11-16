/**
 * ChatWindow Component
 * Main chat interface with messages and composer
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Tooltip,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  ContentCopy,
  Download,
  Share,
  ThumbUp,
  ThumbDown,
  Refresh,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import MessageComposer from './MessageComposer';
import CodeBlock from './CodeBlock';
import { MinimalLoader } from './Loader';
import { mockMessages } from '../utils/mockData';
import { formatRelativeTime, copyToClipboard, downloadAsFile, detectCodeBlocks } from '../utils/helpers';

// Styled message container with animations - ChatGPT style full width
const MessageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.divider}`,
  animation: 'slideIn 0.3s ease-out',
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
  },
}));

// Content wrapper for max-width constraint (ChatGPT: 768px centered)
const MessageContent = styled(Box)(({ theme }) => ({
  maxWidth: '48rem', // 768px - same as ChatGPT
  margin: '0 auto',
  display: 'flex',
  gap: theme.spacing(3),
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

// Text content styled component - flat design like ChatGPT
const TextContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  lineHeight: 1.75,
  fontSize: '1rem',
  '& p': {
    marginBottom: theme.spacing(1.5),
  },
}));

const ChatWindow = ({ conversation }) => {
  const theme = useTheme();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load messages when conversation changes
  useEffect(() => {
    if (conversation && mockMessages[conversation.id]) {
      setMessages(mockMessages[conversation.id]);
    } else {
      setMessages([]);
    }
  }, [conversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    if (!content || !content.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setLoading(true);

    const loadingToast = toast.loading('AI is thinking...');

    try {
      // Simulate AI response - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'This is a simulated AI response. Connect to your backend API to get real responses!',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      toast.success('Response received', { id: loadingToast });
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to send message';
      toast.error(errorMessage, { id: loadingToast });
      
      // Remove the user message if there was an error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleCopyMessage = (content) => {
    copyToClipboard(content);
  };

  const handleDownloadMessage = (content) => {
    downloadAsFile(content, `message-${Date.now()}.txt`, 'text/plain');
  };

  // Empty state
  if (!conversation && messages.length === 0) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            textAlign: 'center',
            maxWidth: '48rem',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to DevTinder AI 🚀
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
            Your intelligent AI assistant for development tasks, code conversion, summarization, and creative content generation.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label="💬 Ask me anything"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
            <Chip
              label="⚡ Convert code"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
            <Chip
              label="📝 Summarize text"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
            <Chip
              label="🎨 Generate content"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
          </Box>
        </Box>

        {/* Message Composer at bottom */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
            py: { xs: 2, md: 3 },
            px: 2,
          }}
        >
          <Box sx={{ maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
            <MessageComposer onSendMessage={handleSendMessage} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Messages Area - Full Width */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: '4px',
          },
        }}
      >
        {messages.map((message) => (
          <MessageContainer key={message.id}>
            <MessageContent>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: message.role === 'user' 
                    ? 'transparent' 
                    : 'primary.main',
                  border: message.role === 'user' ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                  flexShrink: 0,
                  fontSize: '1.25rem',
                }}
              >
                {message.role === 'user' ? '👤' : '🤖'}
              </Avatar>

              {/* Text Content */}
              <TextContent>
                <ChatMessageContent content={message.content} />
                
                {/* Action Buttons - Inline & Subtle */}
                {message.role === 'assistant' && (
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, opacity: 0.7, '&:hover': { opacity: 1 } }}>
                    <Tooltip title="Copy">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyMessage(message.content)}
                        sx={{ 
                          width: 32, 
                          height: 32,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <ContentCopy sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Good">
                      <IconButton size="small" sx={{ width: 32, height: 32 }}>
                        <ThumbUp sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Bad">
                      <IconButton size="small" sx={{ width: 32, height: 32 }}>
                        <ThumbDown sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Regenerate">
                      <IconButton size="small" sx={{ width: 32, height: 32 }}>
                        <Refresh sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </TextContent>
            </MessageContent>
          </MessageContainer>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <MessageContainer>
            <MessageContent>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '1.25rem' }}>
                🤖
              </Avatar>
              <TextContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 0.3 },
                      '50%': { opacity: 1 },
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'pulse 1.5s ease-in-out 0.2s infinite',
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'pulse 1.5s ease-in-out 0.4s infinite',
                  }}
                />
              </TextContent>
            </MessageContent>
          </MessageContainer>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Message Composer - Centered with max-width */}
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          py: { xs: 2, md: 3 },
          px: 2,
        }}
      >
        <Box sx={{ maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
          <MessageComposer onSendMessage={handleSendMessage} disabled={isTyping || loading} />
        </Box>
      </Box>
    </Box>
  );
};

// Component to render message content with code blocks
const ChatMessageContent = ({ content }) => {
  const codeBlocks = detectCodeBlocks(content);

  if (codeBlocks.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.6,
        }}
      >
        {content}
      </Typography>
    );
  }

  // Split content and render with code blocks
  const parts = [];
  let lastIndex = 0;

  codeBlocks.forEach((block, index) => {
    const blockStart = content.indexOf(block.fullMatch, lastIndex);
    
    // Add text before code block
    if (blockStart > lastIndex) {
      parts.push(
        <Typography
          key={`text-${index}`}
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {content.substring(lastIndex, blockStart)}
        </Typography>
      );
    }

    // Add code block
    parts.push(
      <CodeBlock
        key={`code-${index}`}
        code={block.code}
        language={block.language}
      />
    );

    lastIndex = blockStart + block.fullMatch.length;
  });

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(
      <Typography
        key="text-final"
        variant="body1"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.6,
          mt: 2,
        }}
      >
        {content.substring(lastIndex)}
      </Typography>
    );
  }

  return <>{parts}</>;
};

export default ChatWindow;
