/**
 * Mock Data for DevTinder AI Platform
 * Provides realistic conversation data for development and testing
 */

export const mockConversations = [
  {
    id: 'conv-1',
    title: 'React Hook Optimization',
    preview: 'How can I optimize my useEffect hooks?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    unread: false,
    category: 'chatbot',
  },
  {
    id: 'conv-2',
    title: 'API Integration Guide',
    preview: 'Help with axios interceptors setup',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    unread: true,
    category: 'chatbot',
  },
  {
    id: 'conv-3',
    title: 'Convert Python to JS',
    preview: 'Need to convert a Python algorithm',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    unread: false,
    category: 'js-converter',
  },
  {
    id: 'conv-4',
    title: 'Summarize Documentation',
    preview: 'Summarize React 18 migration guide',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    unread: false,
    category: 'summary',
  },
];

export const mockMessages = {
  'conv-1': [
    {
      id: 'msg-1',
      role: 'user',
      content: 'How can I optimize my useEffect hooks to prevent unnecessary re-renders?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content: `Great question! Here are some strategies to optimize useEffect hooks:

1. **Use dependency arrays correctly**: Only include values that the effect actually depends on.

2. **Memoize callback functions**: Use useCallback to prevent function recreation.

\`\`\`javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

useEffect(() => {
  memoizedCallback();
}, [memoizedCallback]);
\`\`\`

3. **Split effects**: Don't combine unrelated logic in a single effect.

4. **Use useRef for values that don't need to trigger re-renders**:

\`\`\`javascript
const countRef = useRef(0);

useEffect(() => {
  const interval = setInterval(() => {
    countRef.current += 1;
    console.log(countRef.current);
  }, 1000);
  
  return () => clearInterval(interval);
}, []); // Empty array - runs once
\`\`\`

Would you like me to explain any of these patterns in more detail?`,
      timestamp: new Date(Date.now() - 3599000).toISOString(),
      codeBlocks: [
        {
          language: 'javascript',
          code: `const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

useEffect(() => {
  memoizedCallback();
}, [memoizedCallback]);`,
        },
        {
          language: 'javascript',
          code: `const countRef = useRef(0);

useEffect(() => {
  const interval = setInterval(() => {
    countRef.current += 1;
    console.log(countRef.current);
  }, 1000);
  
  return () => clearInterval(interval);
}, []); // Empty array - runs once`,
        },
      ],
    },
    {
      id: 'msg-3',
      role: 'user',
      content: 'Yes, can you show me an example with API calls?',
      timestamp: new Date(Date.now() - 3598000).toISOString(),
    },
    {
      id: 'msg-4',
      role: 'assistant',
      content: `Absolutely! Here's a comprehensive example of optimized API calls with useEffect:

\`\`\`javascript
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track if component is mounted
  const isMounted = useRef(true);
  
  // Memoize fetch function
  const fetchUser = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(\`/api/users/\${userId}\`);
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setUser(response.data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [userId]); // Only recreate if userId changes
  
  useEffect(() => {
    fetchUser();
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [fetchUser]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}
\`\`\`

**Key optimizations:**
- ✅ Memoized fetch function with useCallback
- ✅ Proper cleanup to prevent memory leaks
- ✅ Mounted check before setState
- ✅ Single source of truth for userId dependency`,
      timestamp: new Date(Date.now() - 3597000).toISOString(),
      codeBlocks: [
        {
          language: 'javascript',
          code: `import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track if component is mounted
  const isMounted = useRef(true);
  
  // Memoize fetch function
  const fetchUser = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(\`/api/users/\${userId}\`);
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setUser(response.data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [userId]); // Only recreate if userId changes
  
  useEffect(() => {
    fetchUser();
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [fetchUser]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}`,
        },
      ],
    },
  ],
};

// Helper to extract code blocks from message content
export const extractCodeBlocks = (content) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    });
  }

  return blocks;
};

// AI Tool categories with metadata
export const aiTools = [
  {
    id: 'chatbot',
    title: 'AI ChatBot',
    description: 'Interactive conversation with AI assistant',
    icon: 'ChatBubbleOutline',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
    route: '/chatbot',
    features: ['Code assistance', 'Q&A', 'Debugging help'],
  },
  {
    id: 'summary',
    title: 'Text Summary',
    description: 'Condense long text into concise summaries',
    icon: 'Description',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    route: '/summary',
    features: ['Key points extraction', 'Article summarization', 'Quick insights'],
  },
  {
    id: 'paragraph',
    title: 'Paragraph Generator',
    description: 'Generate coherent paragraphs from keywords',
    icon: 'Article',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    route: '/paragraph',
    features: ['Content creation', 'Idea expansion', 'Writing assistance'],
  },
  {
    id: 'js-converter',
    title: 'JS Code Converter',
    description: 'Convert code between languages',
    icon: 'Code',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    route: '/js-converter',
    features: ['Python to JS', 'Syntax translation', 'Code modernization'],
  },
  {
    id: 'scifi-image',
    title: 'AI Image Generator',
    description: 'Create stunning sci-fi images with AI',
    icon: 'Image',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    route: '/scifi-image',
    features: ['Sci-fi scenes', 'Custom prompts', 'High quality'],
  },
];

// User profile mock data
export const mockUser = {
  id: 'user-1',
  name: 'Developer',
  email: 'dev@devtinder.ai',
  avatar: null,
  plan: 'Pro',
  usage: {
    requests: 247,
    limit: 1000,
    resetDate: '2024-12-01',
  },
};

// System prompts for different AI tools
export const systemPrompts = {
  chatbot: 'You are a helpful AI assistant specialized in programming and software development. Provide clear, concise, and accurate responses with code examples when relevant.',
  summary: 'Summarize the following text into key points. Be concise but capture all important information.',
  paragraph: 'Generate a well-structured paragraph based on the provided keywords or topic. Make it informative and engaging.',
  jsConverter: 'Convert the following code to JavaScript. Maintain functionality and use modern ES6+ syntax where appropriate.',
  scifiImage: 'Generate a detailed description for a sci-fi themed image based on the user prompt. Be creative and specific.',
};
