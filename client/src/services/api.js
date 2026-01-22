import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

/**
 * AI Service API calls
 */
export const aiApi = {
  /**
   * Enhance content using AI
   */
  enhanceContent: async (content, type, tone = 'professional') => {
    return apiClient.post('/ai/enhance', { content, type, tone });
  },

  /**
   * Generate project description from keywords
   */
  generateDescription: async (keywords, technologies) => {
    return apiClient.post('/ai/generate-description', { keywords, technologies });
  },

  /**
   * Suggest missing sections
   */
  suggestSections: async (portfolioData) => {
    return apiClient.post('/ai/suggest-sections', portfolioData);
  },

  /**
   * Optimize content length
   */
  optimizeLength: async (content, maxLength) => {
    return apiClient.post('/ai/optimize-length', { content, maxLength });
  },
};

/**
 * Portfolio Service API calls
 */
export const portfolioApi = {
  /**
   * Generate portfolio
   */
  generate: async (portfolioData) => {
    return apiClient.post('/portfolio/generate', portfolioData);
  },

  /**
   * Validate portfolio completeness
   */
  validate: async (portfolioData) => {
    return apiClient.post('/portfolio/validate', portfolioData);
  },

  /**
   * Get available themes
   */
  getThemes: async () => {
    return apiClient.get('/portfolio/themes');
  },

  /**
   * Preview portfolio
   */
  preview: async (portfolioData) => {
    return apiClient.post('/portfolio/preview', portfolioData);
  },
};

/**
 * Export Service API calls
 */
export const exportApi = {
  /**
   * Export as HTML
   */
  exportHTML: async (portfolioData) => {
    return apiClient.post('/export/html', { portfolioData });
  },

  /**
   * Export as React
   */
  exportReact: async (portfolioData) => {
    return apiClient.post('/export/react', { portfolioData });
  },

  /**
   * Export as PDF
   */
  exportPDF: async (portfolioData) => {
    const response = await axios.post(
      `${API_URL}/api/export/pdf`,
      { portfolioData },
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  /**
   * Get export formats info
   */
  getExportInfo: async () => {
    return apiClient.get('/export/info');
  },
};

/**
 * Health check
 */
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    throw new Error('Server is not responding');
  }
};

export default apiClient;
