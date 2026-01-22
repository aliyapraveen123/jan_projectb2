# 🚀 AI-Based Portfolio Generator

A production-ready, AI-powered portfolio generator that creates professional portfolio websites without coding.

## ✨ Features

- 🤖 **AI Content Enhancement** - Automatically refine and rewrite content professionally
- 🎨 **Multiple Themes** - Choose from Minimal, Creative, and Professional themes
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌓 **Dark/Light Mode** - Support for both color schemes
- ⚡ **Live Preview** - Real-time portfolio preview while editing
- 📤 **Multiple Export Options** - HTML, React Template, and PDF
- 🎭 **Smooth Animations** - Beautiful transitions with Framer Motion

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- ShadCN UI
- React Hook Form

### Backend
- Node.js
- Express.js
- OpenAI/Gemini API

### Additional
- html-pdf-node (PDF generation)
- Markdown support

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key or Google Gemini API key

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-portfolio-generator
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Environment Setup

Create `.env` file in the `server` directory:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
# OR
GEMINI_API_KEY=your_gemini_api_key_here

# Choose AI provider: 'openai' or 'gemini'
AI_PROVIDER=openai

NODE_ENV=development
```

Create `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Production Server:**
```bash
cd server
npm start
```

## 📁 Project Structure

```
ai-portfolio-generator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   ├── portfolio/
│   │   │   ├── themes/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   ├── index.js
│   └── package.json
└── README.md
```

## 🎨 Available Themes

1. **Minimal** - Clean and simple design
2. **Creative** - Bold and colorful layout
3. **Professional** - Corporate and elegant style

## 🤖 AI Content Enhancement

The AI system can:
- Rewrite content professionally
- Improve grammar and tone
- Optimize for recruiters
- Suggest missing sections
- Auto-generate project descriptions from keywords

### Sample AI Prompt Structure

```javascript
You are a professional technical writer and UI/UX expert.
Rewrite the following portfolio content to be:
- Clear
- Professional
- Recruiter-friendly
- Concise

User Content:
{{USER_INPUT}}

Output:
Optimized portfolio content only.
```

## 📡 API Endpoints

### AI Enhancement
```
POST /api/ai/enhance
Content-Type: application/json

{
  "content": "string",
  "type": "about|project|experience"
}
```

### Portfolio Generation
```
POST /api/portfolio/generate
Content-Type: application/json

{
  "personalInfo": {...},
  "about": "string",
  "skills": [...],
  "projects": [...],
  "experience": [...],
  "education": [...],
  "socialLinks": {...},
  "theme": "minimal|creative|professional"
}
```

### Export HTML
```
POST /api/export/html
Content-Type: application/json

{
  "portfolioData": {...},
  "theme": "string"
}
```

### Export PDF
```
POST /api/export/pdf
Content-Type: application/json

{
  "portfolioData": {...},
  "theme": "string"
}
```

## 📊 Sample Portfolio Data

```json
{
  "personalInfo": {
    "name": "John Doe",
    "title": "Full Stack Developer",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  },
  "about": "Passionate developer with 5+ years of experience...",
  "skills": [
    { "name": "React", "level": 90 },
    { "name": "Node.js", "level": 85 }
  ],
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a full-stack e-commerce solution",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://github.com/...",
      "image": "https://..."
    }
  ],
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "duration": "2020 - Present",
      "description": "Led development of microservices architecture"
    }
  ],
  "education": [
    {
      "institution": "University of Technology",
      "degree": "B.S. Computer Science",
      "year": "2019"
    }
  ],
  "socialLinks": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "twitter": "https://twitter.com/..."
  }
}
```

## 🔒 Security Considerations

- API keys stored in environment variables
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configured properly

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is valid and has sufficient credits
- Check that the `.env` file is in the correct directory

### CORS Errors
- Verify VITE_API_URL in client `.env` matches server URL
- Check server CORS configuration

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `npm run clean`

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, Node.js, and AI
