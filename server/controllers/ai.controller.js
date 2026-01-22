import aiService from '../services/ai.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * AI Controller
 * Handles AI-related endpoints
 */

/**
 * @route   POST /api/ai/enhance
 * @desc    Enhance content using AI
 * @access  Public
 */
export const enhanceContent = asyncHandler(async (req, res) => {
  const { content, type, tone } = req.body;

  // Enhance content using AI service
  const enhancedContent = await aiService.enhanceContent(content, type, tone);

  res.status(200).json({
    success: true,
    data: {
      original: content,
      enhanced: enhancedContent,
      type,
      tone
    }
  });
});

/**
 * @route   POST /api/ai/generate-description
 * @desc    Generate project description from keywords
 * @access  Public
 */
export const generateDescription = asyncHandler(async (req, res) => {
  const { keywords, technologies } = req.body;

  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({
      success: false,
      error: { message: 'Keywords array is required' }
    });
  }

  const description = await aiService.generateProjectDescription(keywords, technologies);

  res.status(200).json({
    success: true,
    data: {
      description,
      keywords,
      technologies
    }
  });
});

/**
 * @route   POST /api/ai/suggest-sections
 * @desc    Suggest missing portfolio sections
 * @access  Public
 */
export const suggestSections = asyncHandler(async (req, res) => {
  const portfolioData = req.body;

  const missingSections = await aiService.suggestMissingSections(portfolioData);

  res.status(200).json({
    success: true,
    data: {
      missingSections,
      suggestions: missingSections.map(section => ({
        section,
        importance: ['about', 'skills', 'projects'].includes(section) ? 'high' : 'medium',
        description: getSectionDescription(section)
      }))
    }
  });
});

/**
 * @route   POST /api/ai/optimize-length
 * @desc    Optimize content length
 * @access  Public
 */
export const optimizeLength = asyncHandler(async (req, res) => {
  const { content, maxLength } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      error: { message: 'Content is required' }
    });
  }

  const optimized = await aiService.optimizeLength(content, maxLength || 200);

  res.status(200).json({
    success: true,
    data: {
      original: content,
      optimized,
      originalLength: content.length,
      optimizedLength: optimized.length
    }
  });
});

/**
 * Helper function to get section descriptions
 */
function getSectionDescription(section) {
  const descriptions = {
    about: 'A brief introduction about yourself and your professional background',
    skills: 'Technical skills and competencies you possess',
    projects: 'Showcase of your work and achievements',
    experience: 'Your professional work history',
    education: 'Academic background and qualifications',
    certifications: 'Professional certifications and courses',
    achievements: 'Awards and notable accomplishments'
  };

  return descriptions[section] || 'Additional portfolio section';
}
