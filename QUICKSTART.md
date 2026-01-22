# 🎯 AI Portfolio Generator - Quick Start Guide

Welcome to the AI Portfolio Generator! This guide will help you get started quickly.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **API Key** from OpenAI or Google Gemini

## 🚀 Quick Setup (5 minutes)

### Option 1: Automated Setup (Recommended)

```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

**1. Install Server Dependencies**
```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your API key
```

**2. Install Client Dependencies**
```bash
cd ../client
npm install
cp .env.example .env
```

**3. Configure Environment Variables**

Edit `server/.env`:
```env
PORT=5000
AI_PROVIDER=openai
OPENAI_API_KEY=your_key_here
# OR
GEMINI_API_KEY=your_key_here
```

## 🏃 Running the Application

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
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎨 Using the Application

### Step 1: Enter Personal Information
- Fill in your name, title, email, etc.
- All fields with * are required

### Step 2: Write Your About Section
- Write a brief introduction (50+ characters)
- Click **"Enhance with AI"** to improve your text
- AI will make it more professional

### Step 3: Add Skills
- Add your technical skills
- Set proficiency levels
- Skills are auto-categorized

### Step 4: Add Projects
- Add at least 1-3 projects
- Use AI to enhance descriptions
- Add technologies, links, and images

### Step 5: Add Experience
- Add your work history
- Include company, position, and dates
- Describe your responsibilities

### Step 6: Add Education
- Add your degrees and certifications
- Include institution and year

### Step 7: Add Social Links
- Add your GitHub, LinkedIn, etc.
- All links are optional

### Step 8: Choose Theme
- Select from Minimal, Creative, or Professional
- Choose Light or Dark mode

### Step 9: Generate & Export
- Click "Generate" to create your portfolio
- Preview the result
- Export as HTML, React, or PDF

## 🤖 AI Features

### Content Enhancement
The AI can improve:
- About sections
- Project descriptions
- Experience descriptions
- Making content more professional
- Fixing grammar and tone

### How to Use AI Enhancement
1. Write your content first
2. Click the **"Enhance with AI"** button
3. AI will rewrite it professionally
4. Review and edit if needed

## 📤 Exporting Your Portfolio

### HTML Export
- Single file with everything embedded
- Upload to any hosting (Netlify, Vercel, GitHub Pages)
- No dependencies needed

### React Export
- Component-based structure
- Easy to customize
- Separate data file

### PDF Export
- Print-ready format
- Share with recruiters
- Professional layout

## 🎨 Customization

### Themes
- **Minimal**: Clean, simple, content-focused
- **Creative**: Bold, colorful, unique
- **Professional**: Corporate, elegant, serious

### Color Schemes
- **Light**: Better for readability
- **Dark**: Modern, eye-friendly

## 💡 Tips for Best Results

### About Section
- Keep it 150-300 words
- Mention years of experience
- Highlight key skills
- Show personality

### Projects
- Add 3-5 of your best projects
- Include live links and GitHub repos
- Mention technologies used
- Describe impact/results

### Skills
- List 8-15 relevant skills
- Be honest about proficiency
- Group by category

### Experience
- Use action verbs
- Quantify achievements
- Focus on impact
- Keep descriptions concise

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### AI Not Working
- Check your API key in `server/.env`
- Verify you have API credits
- Check server console for errors
- Try switching between OpenAI and Gemini

### CORS Errors
- Ensure backend is running on port 5000
- Check `client/.env` has correct API URL
- Restart both servers

### Build Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Sample Data

Want to see how it works first? Click **"Try Demo"** on the home page to load sample data.

## 🔒 Security Notes

- Never commit `.env` files
- Keep API keys private
- Don't share your `.env` file
- Use environment variables in production

## 🆘 Getting Help

### Common Issues

**Q: AI enhancement is slow**
A: OpenAI/Gemini APIs can take 2-5 seconds. This is normal.

**Q: Can I use it without AI?**
A: Yes! AI enhancement is optional. You can build portfolios without it.

**Q: How much does it cost?**
A: The app is free. You only pay for OpenAI/Gemini API usage (usually < $0.01 per enhancement).

**Q: Can I edit the exported files?**
A: Yes! All exports are fully editable.

## 🎉 You're Ready!

Start building your portfolio now:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Then visit http://localhost:5173 and click "Get Started"!

---

Need more help? Check the main README.md for detailed documentation.
