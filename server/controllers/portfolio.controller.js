import portfolioService from '../services/portfolio.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Portfolio Controller
 * Handles portfolio generation and management
 */

/**
 * @route   POST /api/portfolio/generate
 * @desc    Generate portfolio from user data
 * @access  Public
 */
export const generatePortfolio = asyncHandler(async (req, res) => {
  const portfolioData = req.body;

  // Generate portfolio structure
  const portfolio = portfolioService.generatePortfolio(portfolioData);

  // Validate completeness
  const completeness = portfolioService.validateCompleteness(portfolio);

  res.status(200).json({
    success: true,
    data: {
      portfolio,
      completeness
    }
  });
});

/**
 * @route   POST /api/portfolio/validate
 * @desc    Validate portfolio completeness
 * @access  Public
 */
export const validatePortfolio = asyncHandler(async (req, res) => {
  const portfolioData = req.body;

  // Generate portfolio to validate
  const portfolio = portfolioService.generatePortfolio(portfolioData);
  const completeness = portfolioService.validateCompleteness(portfolio);

  res.status(200).json({
    success: true,
    data: completeness
  });
});

/**
 * @route   GET /api/portfolio/themes
 * @desc    Get available themes
 * @access  Public
 */
export const getThemes = asyncHandler(async (req, res) => {
  const themes = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design with focus on content',
      preview: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Minimal',
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#0ea5e9'
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and colorful layout for creative professionals',
      preview: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Creative',
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate and elegant style for business professionals',
      preview: 'https://via.placeholder.com/400x300/0f172a/ffffff?text=Professional',
      colors: {
        primary: '#0f172a',
        secondary: '#475569',
        accent: '#06b6d4'
      }
    }
  ];

  res.status(200).json({
    success: true,
    data: themes
  });
});

/**
 * @route   POST /api/portfolio/preview
 * @desc    Generate preview data for portfolio
 * @access  Public
 */
export const previewPortfolio = asyncHandler(async (req, res) => {
  const portfolioData = req.body;

  // Generate portfolio
  const portfolio = portfolioService.generatePortfolio(portfolioData);

  res.status(200).json({
    success: true,
    data: {
      preview: portfolio,
      timestamp: new Date().toISOString()
    }
  });
});
