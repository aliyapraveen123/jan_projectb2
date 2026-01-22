# 🔧 Development Guide

## Initial Setup

```bash
cd /home/sama/Desktop/b2/ai-portfolio-generator

# Run automated setup
./setup.sh

# OR manual setup:
cd server && npm install
cd ../client && npm install
```

## Environment Configuration

### Server (.env)
```env
PORT=5000
NODE_ENV=development

# Choose AI provider
AI_PROVIDER=openai

# OpenAI
OPENAI_API_KEY=sk-...

# OR Gemini
GEMINI_API_KEY=...

# CORS
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Client runs on: http://localhost:5173

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Production Server:**
```bash
cd server
NODE_ENV=production npm start
```

## Project Commands

### Server
```bash
npm start          # Production
npm run dev        # Development with nodemon
```

### Client
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Lint code
```

## Testing the Application

### 1. Quick Test with Demo Data
- Go to http://localhost:5173
- Click "Try Demo"
- Explore the pre-filled forms
- Generate portfolio
- Try exporting

### 2. Manual Testing
- Click "Get Started"
- Fill each form step
- Test AI enhancement (needs API key)
- Preview portfolio
- Export in all formats

### 3. API Testing with curl

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Enhance Content:**
```bash
curl -X POST http://localhost:5000/api/ai/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "content": "I am a developer",
    "type": "about",
    "tone": "professional"
  }'
```

**Generate Portfolio:**
```bash
curl -X POST http://localhost:5000/api/portfolio/generate \
  -H "Content-Type: application/json" \
  -d @sample-portfolio.json
```

## Development Workflow

### Adding a New Feature

1. **Backend** (if API needed):
   ```bash
   # Create route
   server/routes/newfeature.routes.js
   
   # Create controller
   server/controllers/newfeature.controller.js
   
   # Create service
   server/services/newfeature.service.js
   
   # Register route in index.js
   ```

2. **Frontend**:
   ```bash
   # Create component
   client/src/components/NewFeature.jsx
   
   # Add to relevant page
   # Update store if needed
   ```

### Adding a New Form Step

1. **Create Form Component:**
   ```jsx
   // client/src/components/forms/NewStepForm.jsx
   const NewStepForm = () => {
     const { portfolioData, updateNewField } = usePortfolioStore();
     
     return (
       <div>
         {/* Form content */}
       </div>
     );
   };
   ```

2. **Update Store:**
   ```javascript
   // client/src/store/portfolioStore.js
   portfolioData: {
     // Add new field
     newField: initialValue
   },
   
   // Add action
   updateNewField: (value) => set(...)
   ```

3. **Add to Builder:**
   ```javascript
   // client/src/pages/Builder.jsx
   const steps = [
     // existing steps...
     { id: 8, title: 'New Step', component: NewStepForm }
   ];
   ```

## Common Development Tasks

### Modifying AI Prompts

Edit `server/services/ai.service.js`:
```javascript
buildPrompt(content, type, tone) {
  const basePrompt = `
    Your custom prompt here...
    ${content}
  `;
  return basePrompt;
}
```

### Adding a New Theme

1. **Update Theme List** (`server/controllers/portfolio.controller.js`):
```javascript
const themes = [
  {
    id: 'newtheme',
    name: 'New Theme',
    description: 'Description',
    colors: { primary: '#color', ... }
  }
];
```

2. **Add Theme Styles** (`server/services/export.service.js`):
```javascript
const themes = {
  newtheme: {
    primary: '#color',
    secondary: '#color',
    // ... more colors
  }
};
```

### Modifying Portfolio Structure

Edit `server/services/portfolio.service.js`:
```javascript
generatePortfolio(data) {
  const portfolio = {
    // Add or modify sections
    newSection: this.formatNewSection(data.newSection)
  };
  return portfolio;
}
```

## Debugging

### Server Debugging

**Enable verbose logging:**
```javascript
// server/index.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Debug AI calls:**
```javascript
// server/services/ai.service.js
console.log('Prompt:', prompt);
console.log('Response:', response);
```

### Client Debugging

**Check Redux DevTools:**
- Zustand store is visible in React DevTools

**Check API calls:**
```javascript
// client/src/services/api.js
apiClient.interceptors.request.use(config => {
  console.log('Request:', config);
  return config;
});
```

**Debug state:**
```javascript
const store = usePortfolioStore();
console.log('Current state:', store.portfolioData);
```

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Lazy load images
- Code splitting with React.lazy

### Backend
- Implement caching for theme requests
- Use response compression
- Optimize AI prompts for shorter responses
- Add request queuing for AI calls

## Code Style

### JavaScript/React
- Use functional components
- Follow React hooks rules
- Use descriptive variable names
- Add JSDoc comments for functions
- Keep components under 300 lines

### Example:
```javascript
/**
 * Enhance content using AI
 * @param {string} content - Original content
 * @param {string} type - Content type
 * @returns {Promise<string>} Enhanced content
 */
async function enhanceContent(content, type) {
  // Implementation
}
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

## Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Or change ports in .env files
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### AI Not Working
1. Check API key in `.env`
2. Verify API credits
3. Check server logs
4. Try different AI provider

### CORS Errors
1. Verify `CLIENT_URL` in server `.env`
2. Restart both servers
3. Check browser console

### Build Fails
```bash
# Clear build cache
rm -rf dist/ build/

# Rebuild
npm run build
```

## Useful Resources

### Documentation
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [OpenAI API](https://platform.openai.com/docs/)
- [Gemini API](https://ai.google.dev/docs)

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag
- Path Intellisense

## Production Checklist

Before deploying to production:

- [ ] Remove console.logs
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins
- [ ] Enable rate limiting
- [ ] Add monitoring/logging
- [ ] Test all API endpoints
- [ ] Test all export formats
- [ ] Verify AI integration
- [ ] Check mobile responsiveness
- [ ] Test error handling
- [ ] Optimize images
- [ ] Enable compression
- [ ] Add analytics (optional)
- [ ] Set up SSL/HTTPS
- [ ] Configure environment variables
- [ ] Test build output

## Deployment Options

### Frontend
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend
- Railway (recommended)
- Render
- Heroku
- AWS EC2
- DigitalOcean

## Getting Help

1. Check documentation (README.md, QUICKSTART.md, TUTORIAL.md)
2. Look at sample code in `server/utils/sampleData.js`
3. Review error messages in terminal
4. Check browser console for client errors
5. Test API with curl or Postman

## Happy Coding! 🚀

Remember:
- Test locally before deploying
- Keep API keys secure
- Document your changes
- Write clean, readable code
- Have fun building amazing portfolios!
