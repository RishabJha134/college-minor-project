/**
 * Conversation Sidebar Component
 * Shows conversation history with search and filters
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Chip,
  Tooltip,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ChatBubbleOutline,
  FilterList,
  Close,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { mockConversations } from '../utils/mockData';
import { formatRelativeTime, truncateText } from '../utils/helpers';

const ConversationSidebar = ({ collapsed, onConversationSelect, currentConversation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations] = useState(mockConversations);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleNewChat = () => {
    onConversationSelect(null);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || conv.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'chatbot', label: 'Chat', icon: '💬' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'js-converter', label: 'Code', icon: '⚡' },
  ];

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
        <Tooltip title="New Chat" placement="right">
          <IconButton
            onClick={handleNewChat}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: theme.shadows[6],
              },
            }}
            aria-label="Start new chat"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Box sx={{ width: '80%', height: 1, bgcolor: 'divider' }} />

        {conversations.slice(0, 5).map((conv) => (
          <Tooltip key={conv.id} title={conv.title} placement="right">
            <IconButton
              onClick={() => onConversationSelect(conv)}
              sx={{
                width: 40,
                height: 40,
                bgcolor: currentConversation?.id === conv.id ? 'action.selected' : 'transparent',
                border: currentConversation?.id === conv.id ? 2 : 0,
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label={`Open conversation: ${conv.title}`}
            >
              <Badge
                color="primary"
                variant="dot"
                invisible={!conv.unread}
                sx={{
                  '& .MuiBadge-dot': {
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <ChatBubbleOutline fontSize="small" />
              </Badge>
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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
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
          💬 Conversations
        </Typography>

        {/* New Chat Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          sx={{
            mb: 2,
            borderRadius: 2,
            py: 1.5,
            bgcolor: 'primary.main',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: theme.shadows[6],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
          aria-label="Start new chat"
        >
          New Chat
        </Button>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'background.surface',
            },
          }}
          aria-label="Search conversations"
        />
      </Box>

      {/* Category Filters */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <FilterList fontSize="small" sx={{ color: 'text.secondary' }} />
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Box>
            }
            size="small"
            onClick={() => setFilterCategory(cat.id)}
            variant={filterCategory === cat.id ? 'filled' : 'outlined'}
            color={filterCategory === cat.id ? 'primary' : 'default'}
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            aria-label={`Filter by ${cat.label}`}
            role="button"
          />
        ))}
      </Box>

      {/* Conversation List */}
      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          py: 1,
          px: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: '3px',
          },
        }}
      >
        {filteredConversations.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              px: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Start a new chat to begin
            </Typography>
          </Box>
        ) : (
          filteredConversations.map((conv) => (
            <ListItem
              key={conv.id}
              disablePadding
              sx={{
                mb: 0.5,
              }}
            >
              <ListItemButton
                selected={currentConversation?.id === conv.id}
                onClick={() => onConversationSelect(conv)}
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 1.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateX(4px)',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    borderLeft: 3,
                    borderColor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  },
                }}
                aria-label={`Open conversation: ${conv.title}`}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    mr: 1.5,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                  }}
                >
                  💬
                </Avatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: conv.unread ? 700 : 500,
                          color: conv.unread ? 'text.primary' : 'text.primary',
                          flexGrow: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {conv.title}
                      </Typography>
                      {conv.unread && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            boxShadow: theme.shadows[6],
                          }}
                          aria-label="Unread"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {truncateText(conv.preview, 50)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.disabled',
                          fontSize: '0.65rem',
                          mt: 0.25,
                          display: 'block',
                        }}
                      >
                        {formatRelativeTime(conv.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ConversationSidebar;
