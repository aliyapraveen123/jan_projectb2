import express from 'express';
import {
  generatePortfolio,
  validatePortfolio,
  getThemes,
  previewPortfolio
} from '../controllers/portfolio.controller.js';
import { validate, portfolioSchema } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/portfolio/generate
// @desc    Generate portfolio from user data
// @access  Public
router.post('/generate', validate(portfolioSchema), generatePortfolio);

// @route   POST /api/portfolio/validate
// @desc    Validate portfolio completeness
// @access  Public
router.post('/validate', validate(portfolioSchema), validatePortfolio);

// @route   GET /api/portfolio/themes
// @desc    Get available themes
// @access  Public
router.get('/themes', getThemes);

// @route   POST /api/portfolio/preview
// @desc    Generate preview data for portfolio
// @access  Public
router.post('/preview', validate(portfolioSchema), previewPortfolio);

export default router;
