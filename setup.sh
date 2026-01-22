#!/bin/bash

# AI Portfolio Generator - Setup Script
# This script will set up both server and client

echo "🚀 Setting up AI Portfolio Generator..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed${NC}"
echo ""

# Setup Server
echo -e "${BLUE}📦 Setting up server...${NC}"
cd server

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${BLUE}⚠️  Please edit server/.env and add your API keys${NC}"
fi

echo "Installing server dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Server dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install server dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Setup Client
echo -e "${BLUE}📦 Setting up client...${NC}"
cd client

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "Installing client dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Client dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install client dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Final instructions
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Add your API keys to server/.env:"
echo "   - OPENAI_API_KEY or GEMINI_API_KEY"
echo ""
echo "2. Start the development servers:"
echo ""
echo "   ${BLUE}Terminal 1 (Server):${NC}"
echo "   cd server && npm run dev"
echo ""
echo "   ${BLUE}Terminal 2 (Client):${NC}"
echo "   cd client && npm run dev"
echo ""
echo "3. Open your browser at http://localhost:5173"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
