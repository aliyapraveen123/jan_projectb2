# 🎓 AI Portfolio Generator - Complete Tutorial

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Server Setup](#server-setup)
4. [Client Setup](#client-setup)
5. [AI Integration](#ai-integration)
6. [API Documentation](#api-documentation)
7. [Customization Guide](#customization-guide)
8. [Deployment](#deployment)

## Introduction

This AI Portfolio Generator is a full-stack application that helps users create professional portfolio websites using AI-powered content enhancement.

### Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **AI**: OpenAI GPT-3.5 / Google Gemini
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Joi

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Client (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    Pages     │  │  Components  │  │    Store     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/REST API
┌────────────────────────▼────────────────────────────────┐
│                    Server (Node.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Routes     │  │ Controllers  │  │   Services   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                  │                  │          │
│         └──────────────────┴──────────────────┘          │
└────────────────────────┬────────────────────────────────┘
                         │
                    ┌────▼────┐
                    │   AI    │
                    │ (GPT/   │
                    │ Gemini) │
                    └─────────┘
```

## Server Setup

### File Structure
```
server/
├── index.js              # Main entry point
├── routes/               # API routes
│   ├── ai.routes.js
│   ├── portfolio.routes.js
│   └── export.routes.js
├── controllers/          # Request handlers
│   ├── ai.controller.js
│   ├── portfolio.controller.js
│   └── export.controller.js
├── services/             # Business logic
│   ├── ai.service.js
│   ├── portfolio.service.js
│   └── export.service.js
├── middleware/           # Middleware functions
│   ├── errorHandler.js
│   └── validation.js
└── utils/               # Utility functions
    └── sampleData.js
```

### Key Services

#### AI Service (`services/ai.service.js`)
Handles all AI-related operations:
```javascript
// Enhance content
aiService.enhanceContent(content, type, tone)

// Generate project description
aiService.generateProjectDescription(keywords, technologies)

// Suggest missing sections
aiService.suggestMissingSections(portfolioData)
```

#### Portfolio Service (`services/portfolio.service.js`)
Manages portfolio generation:
```javascript
// Generate portfolio structure
portfolioService.generatePortfolio(data)

// Validate completeness
portfolioService.validateCompleteness(portfolio)

// Format different sections
portfolioService.formatSkills(skills)
portfolioService.formatProjects(projects)
```

#### Export Service (`services/export.service.js`)
Handles export functionality:
```javascript
// Export as HTML
exportService.exportAsHTML(portfolioData)

// Export as React
exportService.exportAsReact(portfolioData)

// Export as PDF
exportService.exportAsPDF(portfolioData)
```

## Client Setup

### File Structure
```
client/src/
├── App.jsx               # Main app component
├── main.jsx              # Entry point
├── pages/                # Page components
│   ├── Home.jsx
│   ├── Builder.jsx
│   ├── Preview.jsx
│   └── Export.jsx
├── components/           # Reusable components
│   ├── forms/            # Form components
│   │   ├── PersonalInfoForm.jsx
│   │   ├── AboutForm.jsx
│   │   ├── SkillsForm.jsx
│   │   ├── ProjectsForm.jsx
│   │   ├── ExperienceForm.jsx
│   │   ├── EducationForm.jsx
│   │   ├── SocialLinksForm.jsx
│   │   └── ThemeSelector.jsx
│   ├── portfolio/        # Portfolio components
│   │   └── PortfolioPreview.jsx
│   └── ui/               # UI components
│       ├── Input.jsx
│       └── Textarea.jsx
├── services/             # API services
│   └── api.js
├── store/                # State management
│   └── portfolioStore.js
└── utils/                # Utility functions
    └── helpers.js
```

### State Management with Zustand

The app uses Zustand for state management. The store (`store/portfolioStore.js`) manages:
- Portfolio data
- Current builder step
- Generated portfolio
- Completeness score

```javascript
// Usage in components
const { portfolioData, updateAbout } = usePortfolioStore();

// Update about section
updateAbout('New about text');

// Add a skill
addSkill({ name: 'React', level: 90 });
```

### API Service

All API calls are centralized in `services/api.js`:

```javascript
// AI APIs
await aiApi.enhanceContent(content, 'about', 'professional');
await aiApi.generateDescription(keywords, technologies);

// Portfolio APIs
await portfolioApi.generate(portfolioData);
await portfolioApi.getThemes();

// Export APIs
await exportApi.exportHTML(portfolioData);
await exportApi.exportPDF(portfolioData);
```

## AI Integration

### Prompt Engineering

The AI service uses carefully crafted prompts for best results:

```javascript
const prompt = `You are a professional technical writer and UI/UX expert.

Your task is to rewrite the following ${type} section content to be:
- Clear and concise
- Professional and polished
- Recruiter-friendly and impactful
- Free of grammatical errors
- Optimized for readability

User Content:
${content}

Output ONLY the enhanced content, no explanations.`;
```

### AI Providers

The app supports both OpenAI and Google Gemini:

**OpenAI (GPT-3.5-turbo)**
```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ],
  temperature: 0.7,
  max_tokens: 500
});
```

**Google Gemini**
```javascript
const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
const result = await model.generateContent(prompt);
const response = await result.response;
```

### Switching Providers

Edit `server/.env`:
```env
# Use OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=your_key

# OR use Gemini
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key
```

## API Documentation

### AI Endpoints

#### POST /api/ai/enhance
Enhance content using AI.

**Request:**
```json
{
  "content": "I am a developer...",
  "type": "about",
  "tone": "professional"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "I am a developer...",
    "enhanced": "Experienced software developer..."
  }
}
```

### Portfolio Endpoints

#### POST /api/portfolio/generate
Generate complete portfolio structure.

**Request:**
```json
{
  "personalInfo": { "name": "John", "title": "Developer", ...},
  "about": "...",
  "skills": [...],
  "theme": "minimal"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "portfolio": { ... },
    "completeness": {
      "percentage": 85,
      "suggestions": [...]
    }
  }
}
```

#### GET /api/portfolio/themes
Get available themes.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "minimal",
      "name": "Minimal",
      "description": "Clean and simple design"
    }
  ]
}
```

### Export Endpoints

#### POST /api/export/html
Export as HTML.

**Response:**
```json
{
  "success": true,
  "data": {
    "html": "<!DOCTYPE html>...",
    "filename": "john-doe-portfolio.html"
  }
}
```

#### POST /api/export/pdf
Export as PDF.

**Response:** Binary PDF file

## Customization Guide

### Adding New Themes

1. **Add theme to server** (`server/controllers/portfolio.controller.js`):
```javascript
{
  id: 'custom',
  name: 'Custom Theme',
  description: 'Your custom theme',
  colors: {
    primary: '#yourcolor',
    secondary: '#yourcolor'
  }
}
```

2. **Add theme styles** (`server/services/export.service.js`):
```javascript
const themes = {
  custom: {
    primary: '#yourcolor',
    secondary: '#yourcolor',
    // ... more colors
  }
}
```

### Adding Form Fields

1. **Update store** (`client/src/store/portfolioStore.js`):
```javascript
portfolioData: {
  // Add new field
  certifications: []
}
```

2. **Create form component**:
```jsx
// client/src/components/forms/CertificationsForm.jsx
const CertificationsForm = () => {
  // Form logic
};
```

3. **Add to builder**:
```javascript
// client/src/pages/Builder.jsx
const steps = [
  // ... existing steps
  { id: 8, title: 'Certifications', component: CertificationsForm }
];
```

### Modifying AI Prompts

Edit `server/services/ai.service.js`:
```javascript
buildPrompt(content, type, tone) {
  // Customize your prompt here
  const basePrompt = `Your custom instructions...`;
  return basePrompt;
}
```

## Deployment

### Deploying to Vercel/Netlify

**1. Build the client:**
```bash
cd client
npm run build
```

**2. Deploy backend to service like Railway/Render**

**3. Update environment variables**

### Environment Variables for Production

**Server:**
```env
NODE_ENV=production
PORT=5000
OPENAI_API_KEY=your_key
CLIENT_URL=https://your-frontend-url.com
```

**Client:**
```env
VITE_API_URL=https://your-backend-url.com
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
# Server
FROM node:18
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./
EXPOSE 5000
CMD ["npm", "start"]
```

## Best Practices

### Error Handling
- Always use try-catch blocks
- Provide meaningful error messages
- Log errors for debugging

### Performance
- Use debouncing for AI calls
- Implement loading states
- Cache API responses where possible

### Security
- Validate all inputs
- Sanitize user content
- Use environment variables for secrets
- Implement rate limiting

## Troubleshooting

### Common Issues

1. **AI not responding**: Check API key and credits
2. **CORS errors**: Verify CLIENT_URL in server .env
3. **Build failures**: Clear node_modules and reinstall
4. **PDF generation fails**: Ensure html-pdf-node dependencies are installed

---

For more help, check the main README.md or open an issue on GitHub.
