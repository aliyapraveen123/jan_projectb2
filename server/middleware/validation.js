import Joi from 'joi';

/**
 * Validation middleware factory
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');

      // Log the validation error for debugging
      console.log('❌ Validation Error:', errorMessage);
      console.log('📦 Request body:', JSON.stringify(req.body, null, 2));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation Error',
          details: errorMessage
        }
      });
    }

    // Replace request body with validated value
    req.body = value;
    next();
  };
};

// Validation schemas
export const enhanceContentSchema = Joi.object({
  content: Joi.string().required().min(1).max(5000),
  type: Joi.string().valid('about', 'project', 'experience', 'education', 'general').required(),
  tone: Joi.string().valid('professional', 'casual', 'technical').optional().default('professional')
});

export const portfolioSchema = Joi.object({
  personalInfo: Joi.object({
    name: Joi.string().required().min(2).max(100),
    title: Joi.string().required().min(2).max(200),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(''),
    location: Joi.string().optional().allow(''),
    website: Joi.string().uri().optional().allow('')
  }).required(),
  
  about: Joi.string().optional().allow('').min(0).max(2000),
  
  skills: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      level: Joi.number().min(0).max(100).optional(),
      category: Joi.string().optional().allow('')
    })
  ).optional().default([]),
  
  projects: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional().allow(''),
      technologies: Joi.array().items(Joi.string()).optional().default([]),
      link: Joi.string().uri().optional().allow(''),
      github: Joi.string().uri().optional().allow(''),
      image: Joi.string().uri().optional().allow(''),
      featured: Joi.boolean().optional()
    })
  ).optional().default([]),
  
  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      position: Joi.string().required(),
      duration: Joi.string().optional().allow(''),
      description: Joi.string().optional().allow(''),
      location: Joi.string().optional().allow('')
    })
  ).optional().default([]),
  
  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      degree: Joi.string().required(),
      field: Joi.string().optional().allow(''),
      year: Joi.string().optional().allow(''),
      description: Joi.string().optional().allow('')
    })
  ).optional().default([]),
  
  socialLinks: Joi.object({
    github: Joi.string().uri().optional().allow(''),
    linkedin: Joi.string().uri().optional().allow(''),
    twitter: Joi.string().uri().optional().allow(''),
    instagram: Joi.string().uri().optional().allow(''),
    youtube: Joi.string().uri().optional().allow(''),
    website: Joi.string().uri().optional().allow('')
  }).optional().default({}),
  
  theme: Joi.string().valid('minimal', 'creative', 'professional').required(),
  colorScheme: Joi.string().valid('light', 'dark').optional().default('light')
});

export const exportSchema = Joi.object({
  portfolioData: Joi.object().required(), // Accept any portfolio structure for export
  format: Joi.string().valid('html', 'react', 'pdf').optional()
});
