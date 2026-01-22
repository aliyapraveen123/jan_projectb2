import express from 'express';
import {
  enhanceContent,
  generateDescription,
  suggestSections,
  optimizeLength
} from '../controllers/ai.controller.js';
import { validate, enhanceContentSchema } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/ai/enhance
// @desc    Enhance content using AI
// @access  Public
router.post('/enhance', validate(enhanceContentSchema), enhanceContent);

// @route   POST /api/ai/generate-description
// @desc    Generate project description from keywords
// @access  Public
router.post('/generate-description', generateDescription);

// @route   POST /api/ai/suggest-sections
// @desc    Suggest missing portfolio sections
// @access  Public
router.post('/suggest-sections', suggestSections);

// @route   POST /api/ai/optimize-length
// @desc    Optimize content length
// @access  Public
router.post('/optimize-length', optimizeLength);

export default router;
