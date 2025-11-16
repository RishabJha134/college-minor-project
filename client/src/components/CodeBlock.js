/**
 * CodeBlock Component
 * Displays code with syntax highlighting, copy button, and language label
 */

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
} from '@mui/material';
import {
  ContentCopy,
  Check,
  Download,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { copyToClipboard, getLanguageDisplayName, downloadAsFile } from '../utils/helpers';

const CodeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.code.bg 
    : theme.palette.grey[100],
  border: `1px solid ${theme.palette.code.border}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

const CodeHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.mode === 'dark'
    ? theme.palette.background.paper
    : theme.palette.grey[200],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CodeContent = styled('pre')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  overflow: 'auto',
  fontFamily: theme.typography.code.fontFamily,
  fontSize: theme.typography.code.fontSize,
  lineHeight: 1.6,
  color: theme.palette.text.primary,
  maxHeight: '500px',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
  '& code': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
}));

const CodeBlock = ({ code, language = 'text' }) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const extension = getFileExtension(language);
    downloadAsFile(code, `code.${extension}`, 'text/plain');
  };

  const getFileExtension = (lang) => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      php: 'php',
      swift: 'swift',
      kotlin: 'kt',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      sql: 'sql',
      bash: 'sh',
      shell: 'sh',
    };
    return extensions[lang?.toLowerCase()] || 'txt';
  };

  return (
    <CodeContainer role="region" aria-label="Code block">
      <CodeHeader>
        {/* Language Label */}
        <Chip
          label={getLanguageDisplayName(language)}
          size="small"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            fontSize: '0.75rem',
            fontFamily: theme.typography.code.fontFamily,
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                color: copied ? 'success.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Copy code to clipboard"
            >
              {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Download code">
            <IconButton
              size="small"
              onClick={handleDownload}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              aria-label="Download code as file"
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CodeHeader>

      <CodeContent>
        <code>{code}</code>
      </CodeContent>

      {/* Optional: Syntax highlighting notice */}
      <Box
        sx={{
          px: 2,
          py: 1,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.200',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          💡 <strong>Note:</strong> Install <code>prismjs</code> or <code>highlight.js</code> for syntax highlighting
        </Typography>
      </Box>
    </CodeContainer>
  );
};

export default CodeBlock;

/**
 * OPTIONAL: Syntax Highlighting Integration
 * 
 * To enable full syntax highlighting, install one of these libraries:
 * 
 * Option 1: Prism.js
 * npm install prismjs
 * 
 * Then import and use:
 * import Prism from 'prismjs';
 * import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
 * import 'prismjs/components/prism-javascript';
 * import 'prismjs/components/prism-python';
 * // Add more languages as needed
 * 
 * useEffect(() => {
 *   Prism.highlightAll();
 * }, [code]);
 * 
 * Option 2: Highlight.js
 * npm install highlight.js
 * 
 * import hljs from 'highlight.js';
 * import 'highlight.js/styles/github-dark.css';
 * 
 * useEffect(() => {
 *   hljs.highlightAll();
 * }, [code]);
 * 
 * Option 3: React Syntax Highlighter (Easiest)
 * npm install react-syntax-highlighter
 * 
 * import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
 * import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
 * 
 * <SyntaxHighlighter language={language} style={vscDarkPlus}>
 *   {code}
 * </SyntaxHighlighter>
 */
