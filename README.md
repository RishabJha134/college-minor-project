# 🚀 AI-VERSE AI - Complete AI Utility Platform

<div align="center">

![AI-VERSE AI](https://img.shields.io/badge/AI-VERSE-AI%20Platform-22d3ee?style=for-the-badge&logo=react&logoColor=white)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-818cf8?style=for-the-badge)

**Transform Your Ideas with AI Magic** ✨

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [API](#api) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**AI-VERSE AI** is a comprehensive AI utility platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides multiple AI-powered tools in a single, beautiful interface. From intelligent chatbots to code converters, text summarizers to image generators, AI-VERSE AI empowers developers, content creators, and professionals with cutting-edge artificial intelligence capabilities.

### Why AI-VERSE AI?

- 🤖 **Multiple AI Tools** - Access 6+ AI-powered utilities in one platform
- 🎨 **Beautiful UI** - Premium SAAS-grade design with glassmorphism and smooth animations
- 🔒 **Secure** - JWT-based authentication with encrypted data storage
- ⚡ **Fast** - Optimized performance with real-time responses
- 🌓 **Dark/Light Mode** - Elegant theme switching for comfortable viewing
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🤖 AI ChatBot
- Interactive conversation with AI assistant
- Advanced natural language understanding
- Code assistance and Q&A support
- Context-aware responses

### 🔄 Code Converter
- Convert code between multiple programming languages
- Support for JavaScript, Python, Java, C++, and more
- Syntax highlighting and formatting
- Instant conversion with error handling

### 📝 Text Summarizer
- Condense long texts into concise summaries
- Extract key points and main ideas
- Support for articles, documents, and web content
- Customizable summary length

### 💡 Paragraph Generator
- Generate coherent paragraphs from keywords
- Perfect for content creation and brainstorming
- SEO-optimized content generation
- Multiple writing styles

### 🖼️ AI Image Generation
- Create stunning sci-fi images from text descriptions
- Powered by advanced AI models
- High-quality image outputs
- Creative and artistic results

### 🧠 Smart AI Models
- Multiple AI models for different tasks
- Intelligent model selection
- Optimized for performance and accuracy
- Regular updates with latest AI technology

### 👤 User Management
- Secure user registration and authentication
- JWT token-based authorization
- Profile management
- Conversation history tracking

### 🎨 Premium UI/UX
- Modern glassmorphism design
- Smooth animations and transitions
- Responsive layout for all devices
- Dark/Light theme support
- Intuitive navigation

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **Material-UI (MUI)** - Premium component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing

### AI Integration
- **OpenAI API** - GPT models for text generation
- **Google Generative AI** - Gemini models for various tasks
- **Custom AI Models** - Integrated AI capabilities

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (v4.0.0 or higher) - Local or MongoDB Atlas
- **Git** - Version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/RishabJha134/college-minor-project.git
cd MernStack-chatGPT-Clone
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# AI API Keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_gemini_api_key

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### Frontend Configuration

The frontend proxy is already configured in `client/package.json`:

```json
"proxy": "http://localhost:8080"
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
mongod --dbpath /path/to/your/data/directory
```

**Option 2: MongoDB Atlas**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

### API Keys Setup

**OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

**Google Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env` file

---

## 🎮 Running the Application

### Development Mode

**Option 1: Run Both Frontend and Backend Together**
```bash
# From the backend directory
npm run dev
```

**Option 2: Run Separately**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Production Mode

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **API Documentation:** http://localhost:8080/api

---

## 📁 Project Structure

```
MernStack-chatGPT-Clone/
├── backend/                      # Backend Node.js application
│   ├── config/                   # Configuration files
│   │   └── db.js                # Database connection
│   ├── controllers/              # Route controllers
│   │   ├── authController.js    # Authentication logic
│   │   └── openiaController.js  # AI operations logic
│   ├── middlewares/              # Custom middlewares
│   │   └── errorMiddleware.js   # Error handling
│   ├── models/                   # Mongoose models
│   │   └── userModel.js         # User schema
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── openaiRoutes.js      # AI endpoints
│   ├── utils/                    # Utility functions
│   │   └── errroResponse.js     # Error response helper
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json              # Backend dependencies
│
├── client/                       # Frontend React application
│   ├── public/                   # Static files
│   │   ├── index.html           # HTML template
│   │   └── manifest.json        # PWA manifest
│   ├── src/                      # Source files
│   │   ├── api/                 # API configuration
│   │   │   └── axios.js         # Axios instance
│   │   ├── components/          # Reusable components
│   │   │   ├── ChatLayout.js    # Chat layout
│   │   │   ├── ChatWindow.js    # Chat window
│   │   │   ├── CodeBlock.js     # Code display
│   │   │   ├── ConversationSidebar.js
│   │   │   ├── ErrorBoundary.js # Error boundary
│   │   │   ├── Loader.js        # Loading states
│   │   │   ├── MessageComposer.js
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── RightPanel.js    # Right sidebar
│   │   ├── context/             # Context providers
│   │   │   ├── AuthContext.js   # Authentication context
│   │   │   └── ThemeContext.js  # Theme context
│   │   ├── pages/               # Page components
│   │   │   ├── ChatBot.js       # AI ChatBot page
│   │   │   ├── Homepage.js      # Landing page
│   │   │   ├── JsConverter.js   # Code Converter page
│   │   │   ├── Login.js         # Login page
│   │   │   ├── LoginNew.js      # New login design
│   │   │   ├── Paragraph.js     # Paragraph Generator
│   │   │   ├── Register.js      # Register page
│   │   │   ├── RegisterNew.js   # New register design
│   │   │   ├── ScifiImage.js    # Image Generator
│   │   │   └── Summary.js       # Text Summarizer
│   │   ├── utils/               # Utility functions
│   │   │   ├── helpers.js       # Helper functions
│   │   │   └── mockData.js      # Mock data
│   │   ├── App.css              # Global styles
│   │   ├── App.js               # Main App component
│   │   ├── index.css            # Root styles
│   │   ├── index.js             # Entry point
│   │   └── theme.js             # Theme configuration
│   └── package.json             # Frontend dependencies
│
├── .gitignore                    # Git ignore file
├── README.md                     # Project documentation
├── SETUP_GUIDE.md               # Setup instructions
├── FEATURES.md                  # Features documentation
├── HUGGINGFACE_SETUP.md         # HuggingFace integration
└── CLIENT_README.md             # Client documentation
```

---

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Logout User
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

### AI Endpoints

#### AI ChatBot
```http
POST /api/v1/openai/chatbot
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Your question here"
}
```

#### Code Converter
```http
POST /api/v1/openai/js-converter
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "def hello():\n    print('Hello')",
  "language": "JavaScript"
}
```

#### Text Summarizer
```http
POST /api/v1/openai/summary
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Long text to summarize..."
}
```

#### Paragraph Generator
```http
POST /api/v1/openai/paragraph
Authorization: Bearer <token>
Content-Type: application/json

{
  "keywords": "AI, machine learning, innovation"
}
```

#### AI Image Generation
```http
POST /api/v1/openai/scifi-image
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "A futuristic city with flying cars"
}
```

---

## 📸 Screenshots

### Landing Page
*Premium SAAS-grade landing page with glassmorphism design*

### AI ChatBot
*Interactive AI assistant with real-time responses*

### Code Converter
*Multi-language code conversion with syntax highlighting*

### Text Summarizer
*Intelligent text summarization with key point extraction*

### Dark Mode
*Beautiful dark theme for comfortable viewing*

---

## 🎨 Features in Detail

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Persistent login sessions
- Automatic token refresh

### AI Integration
- Multiple AI model support (OpenAI GPT, Google Gemini)
- Intelligent model selection based on task
- Error handling and fallback mechanisms
- Rate limiting and quota management
- Response caching for improved performance

### User Experience
- Smooth animations and transitions
- Loading states and progress indicators
- Error boundaries for graceful error handling
- Toast notifications for user feedback
- Responsive design for all screen sizes

### Performance Optimization
- Code splitting and lazy loading
- Optimized bundle size
- Efficient state management
- API response caching
- Image optimization

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt encryption for passwords
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Server-side validation for all inputs
- **XSS Protection** - Sanitized user inputs
- **Rate Limiting** - API rate limiting to prevent abuse
- **Environment Variables** - Sensitive data in .env files
- **HTTPS Support** - SSL/TLS encryption in production

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd client
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 🚀 Deployment

### Deploy to Heroku

**Backend:**
```bash
cd backend
heroku create AI-VERSE-ai-backend
git push heroku main
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
```

**Frontend:**
```bash
cd client
npm run build
# Deploy to Netlify or Vercel
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod

# Deploy backend
cd backend
vercel --prod
```

### Deploy to Render

1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service for backend
4. Create new Static Site for frontend
5. Set environment variables
6. Deploy!

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

---

## 💡 Feature Requests

Have an idea? Open an issue with:

- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Any relevant examples or mockups

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 AI-VERSE AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors

- **Rishab Jha** - [@RishabJha134](https://github.com/RishabJha134)

---

## 🙏 Acknowledgments

- OpenAI for GPT models
- Google for Gemini AI models
- Material-UI for the component library
- MongoDB for the database
- React team for the amazing framework
- All contributors and supporters

---

## 📞 Contact

- **GitHub**: [@RishabJha134](https://github.com/RishabJha134)
- **Email**: support@AI-VERSEai.com
- **Project Link**: [https://github.com/RishabJha134/college-minor-project](https://github.com/RishabJha134/college-minor-project)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

[![GitHub Stars](https://img.shields.io/github/stars/RishabJha134/college-minor-project?style=social)](https://github.com/RishabJha134/college-minor-project)
[![GitHub Forks](https://img.shields.io/github/forks/RishabJha134/college-minor-project?style=social)](https://github.com/RishabJha134/college-minor-project/fork)

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

<div align="center">

**Made with ❤️ by AI-VERSE AI Team**

⭐ Star us on GitHub — it helps!

[⬆ Back to Top](#-AI-VERSE-ai---complete-ai-utility-platform)

</div>
