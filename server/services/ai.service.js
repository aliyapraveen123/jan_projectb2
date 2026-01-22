import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * AI Service for content enhancement
 * Supports both OpenAI and Google Gemini
 */
class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'openai';
    this.initializeProviders();
  }

  /**
   * Initialize AI provider clients
   */
  initializeProviders() {
    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }

    // Initialize Gemini
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.geminiModel = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  /**
   * Main method to enhance content using AI
   * @param {string} content - Original content
   * @param {string} type - Content type (about, project, experience, etc.)
   * @param {string} tone - Desired tone (professional, casual, technical)
   * @returns {Promise<string>} Enhanced content
   */
  async enhanceContent(content, type = 'general', tone = 'professional') {
    if (!content || content.trim().length === 0) {
      throw new Error('Content cannot be empty');
    }

    const prompt = this.buildPrompt(content, type, tone);

    try {
      if (this.provider === 'openai' && this.openai) {
        return await this.enhanceWithOpenAI(prompt);
      } else if (this.provider === 'gemini' && this.geminiModel) {
        return await this.enhanceWithGemini(prompt);
      } else {
        throw new Error('No AI provider configured. Please set up OpenAI or Gemini API key.');
      }
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      throw new Error(`AI enhancement failed: ${error.message}`);
    }
  }

  /**
   * Build prompt based on content type and tone
   * @param {string} content - Original content
   * @param {string} type - Content type
   * @param {string} tone - Desired tone
   * @returns {string} Formatted prompt
   */
  buildPrompt(content, type, tone) {
    const basePrompt = `You are a professional technical writer and UI/UX expert specializing in portfolio content.

Your task is to rewrite the following ${type} section content to be:
- Clear and concise
- ${tone === 'professional' ? 'Professional and polished' : tone === 'technical' ? 'Technical and detailed' : 'Friendly and approachable'}
- Recruiter-friendly and impactful
- Free of grammatical errors
- Optimized for readability
${type === 'project' ? '- Highlighting key achievements and technologies' : ''}
${type === 'experience' ? '- Emphasizing responsibilities and accomplishments using action verbs' : ''}
${type === 'about' ? '- Creating a compelling personal summary that showcases unique value' : ''}

User Content:
${content}

Instructions:
- Maintain the core message and facts
- Improve sentence structure and word choice
- Add professional terminology where appropriate
- Keep the response concise (do not add unnecessary filler)
- Output ONLY the enhanced content, no explanations or meta-commentary
- Do not add content that wasn't in the original text

Enhanced Content:`;

    return basePrompt;
  }

  /**
   * Enhance content using OpenAI
   * @param {string} prompt - Formatted prompt
   * @returns {Promise<string>} Enhanced content
   */
  async enhanceWithOpenAI(prompt) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional portfolio content writer. Provide concise, clear, and professional rewrites.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3
    });

    return response.choices[0]?.message?.content?.trim() || '';
  }

  /**
   * Enhance content using Google Gemini
   * @param {string} prompt - Formatted prompt
   * @returns {Promise<string>} Enhanced content
   */
  async enhanceWithGemini(prompt) {
    const result = await this.geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  /**
   * Generate project description from keywords
   * @param {Array<string>} keywords - Project keywords
   * @param {Array<string>} technologies - Technologies used
   * @returns {Promise<string>} Generated description
   */
  async generateProjectDescription(keywords, technologies = []) {
    const prompt = `Create a concise, professional project description (2-3 sentences) for a portfolio based on these details:

Keywords: ${keywords.join(', ')}
Technologies: ${technologies.join(', ')}

The description should:
- Be clear and impactful
- Highlight the project's purpose and value
- Mention key technologies used
- Be suitable for a professional portfolio

Output only the description, no additional text:`;

    try {
      if (this.provider === 'openai' && this.openai) {
        return await this.enhanceWithOpenAI(prompt);
      } else if (this.provider === 'gemini' && this.geminiModel) {
        return await this.enhanceWithGemini(prompt);
      }
    } catch (error) {
      console.error('Project description generation failed:', error);
      throw error;
    }
  }

  /**
   * Suggest missing portfolio sections
   * @param {Object} portfolioData - Current portfolio data
   * @returns {Promise<Array<string>>} Suggested sections
   */
  async suggestMissingSections(portfolioData) {
    const existingSections = Object.keys(portfolioData);
    const allSections = ['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements'];
    
    const missingSections = allSections.filter(section => 
      !existingSections.includes(section) || 
      (Array.isArray(portfolioData[section]) && portfolioData[section].length === 0) ||
      !portfolioData[section]
    );

    return missingSections;
  }

  /**
   * Optimize content length
   * @param {string} content - Content to optimize
   * @param {number} maxLength - Maximum character length
   * @returns {Promise<string>} Optimized content
   */
  async optimizeLength(content, maxLength = 200) {
    if (content.length <= maxLength) {
      return content;
    }

    const prompt = `Shorten the following text to approximately ${maxLength} characters while maintaining the key message and professional tone:

${content}

Shortened version:`;

    try {
      if (this.provider === 'openai' && this.openai) {
        return await this.enhanceWithOpenAI(prompt);
      } else if (this.provider === 'gemini' && this.geminiModel) {
        return await this.enhanceWithGemini(prompt);
      }
    } catch (error) {
      // Fallback to simple truncation if AI fails
      return content.substring(0, maxLength - 3) + '...';
    }
  }
}

// Export singleton instance
export default new AIService();
