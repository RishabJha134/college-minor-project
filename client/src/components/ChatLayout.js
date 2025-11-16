/**
 * Main Chat Layout Component
 * Three-column layout: Sidebar | ChatWindow | RightPanel
 * Responsive with drawer support for mobile/tablet
 */

import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import ConversationSidebar from './ConversationSidebar';
import ChatWindow from './ChatWindow';
import RightPanel from './RightPanel';

const ChatLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Drawer states
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  
  // Sidebar collapse state for desktop
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  // Current conversation
  const [currentConversation, setCurrentConversation] = useState(null);

  const sidebarWidth = leftCollapsed ? 60 : 280;
  const rightPanelWidth = rightCollapsed ? 60 : 320;

  // Toggle functions
  const toggleLeftDrawer = () => setLeftDrawerOpen(!leftDrawerOpen);
  const toggleRightDrawer = () => setRightDrawerOpen(!rightDrawerOpen);
  const toggleLeftCollapse = () => setLeftCollapsed(!leftCollapsed);
  const toggleRightCollapse = () => setRightCollapsed(!rightCollapsed);

  // Desktop Layout
  if (!isMobile && !isTablet) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 64px)', // Subtract navbar height
          width: '100%',
          bgcolor: 'background.default',
          position: 'relative',
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: sidebarWidth,
            height: '100%',
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'width 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <ConversationSidebar
            collapsed={leftCollapsed}
            onConversationSelect={setCurrentConversation}
            currentConversation={currentConversation}
          /> */}
          
          {/* Collapse Toggle Button */}
          <IconButton
            onClick={toggleLeftCollapse}
            sx={{
              position: 'absolute',
              right: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              zIndex: 10,
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            aria-label={leftCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {leftCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {/* Main Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: 'background.default',
          }}
        >
          <ChatWindow conversation={currentConversation} />
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            width: rightPanelWidth,
            height: '100%',
            flexShrink: 0,
            borderLeft: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'width 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <RightPanel collapsed={rightCollapsed} />
          
          {/* Collapse Toggle Button */}
          <IconButton
            onClick={toggleRightCollapse}
            sx={{
              position: 'absolute',
              left: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              zIndex: 10,
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            aria-label={rightCollapsed ? 'Expand panel' : 'Collapse panel'}
          >
            {rightCollapsed ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      </Box>
    );
  }

  // Mobile/Tablet Layout with Drawers
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        width: '100%',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {/* Left Drawer (Conversations) */}
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={toggleLeftDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.paper',
            pt: '70px', // Account for fixed navbar
          },
        }}
      >
        <ConversationSidebar
          collapsed={false}
          onConversationSelect={(conv) => {
            setCurrentConversation(conv);
            setLeftDrawerOpen(false);
          }}
          currentConversation={currentConversation}
        />
      </Drawer>

      {/* Right Drawer (Tools) */}
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={toggleRightDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            bgcolor: 'background.paper',
            pt: '70px',
          },
        }}
      >
        <RightPanel collapsed={false} />
      </Drawer>

      {/* Floating Action Buttons */}
      <IconButton
        onClick={toggleLeftDrawer}
        sx={{
          position: 'fixed',
          top: 80,
          left: 16,
          zIndex: 1100,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 6,
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s',
        }}
        aria-label="Open conversations menu"
      >
        <MenuIcon />
      </IconButton>

      <IconButton
        onClick={toggleRightDrawer}
        sx={{
          position: 'fixed',
          top: 80,
          right: 16,
          zIndex: 1100,
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          boxShadow: 6,
          '&:hover': {
            bgcolor: 'secondary.dark',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s',
        }}
        aria-label="Open tools menu"
      >
        <MenuIcon sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>

      {/* Main Chat Area - Full Width on Mobile */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <ChatWindow conversation={currentConversation} />
      </Box>
    </Box>
  );
};

export default ChatLayout;
