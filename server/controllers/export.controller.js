import exportService from '../services/export.service.js';
import portfolioService from '../services/portfolio.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Export Controller
 * Handles portfolio export in various formats
 */

/**
 * @route   POST /api/export/html
 * @desc    Export portfolio as HTML
 * @access  Public
 */
export const exportHTML = asyncHandler(async (req, res) => {
  const { portfolioData } = req.body;

  // Generate portfolio structure if not already formatted
  const portfolio = portfolioData.metadata 
    ? portfolioData 
    : portfolioService.generatePortfolio(portfolioData);

  // Generate HTML
  const html = await exportService.exportAsHTML(portfolio);

  res.status(200).json({
    success: true,
    data: {
      html,
      filename: `${portfolio.personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`
    }
  });
});

/**
 * @route   POST /api/export/react
 * @desc    Export portfolio as React component
 * @access  Public
 */
export const exportReact = asyncHandler(async (req, res) => {
  const { portfolioData } = req.body;

  // Generate portfolio structure if not already formatted
  const portfolio = portfolioData.metadata 
    ? portfolioData 
    : portfolioService.generatePortfolio(portfolioData);

  // Generate React files
  const reactFiles = await exportService.exportAsReact(portfolio);

  res.status(200).json({
    success: true,
    data: {
      files: reactFiles,
      structure: Object.keys(reactFiles)
    }
  });
});

/**
 * @route   POST /api/export/pdf
 * @desc    Export portfolio as PDF
 * @access  Public
 */
export const exportPDF = asyncHandler(async (req, res) => {
  const { portfolioData } = req.body;

  // Generate portfolio structure if not already formatted
  const portfolio = portfolioData.metadata 
    ? portfolioData 
    : portfolioService.generatePortfolio(portfolioData);

  // Generate PDF
  const pdfBuffer = await exportService.exportAsPDF(portfolio);

  // Set headers for file download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${portfolio.personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.pdf"`
  );

  res.send(pdfBuffer);
});

/**
 * @route   POST /api/export/all
 * @desc    Get all export formats info (without generating files)
 * @access  Public
 */
export const getExportInfo = asyncHandler(async (req, res) => {
  const exportFormats = [
    {
      format: 'html',
      name: 'Static HTML',
      description: 'Single HTML file with embedded CSS and JavaScript',
      endpoint: '/api/export/html',
      fileType: '.html',
      features: [
        'Fully responsive',
        'No dependencies',
        'Easy to host anywhere',
        'SEO optimized'
      ]
    },
    {
      format: 'react',
      name: 'React Component',
      description: 'React component template with separate data file',
      endpoint: '/api/export/react',
      fileType: '.jsx',
      features: [
        'Modular structure',
        'Easy to customize',
        'Reusable components',
        'Modern React practices'
      ]
    },
    {
      format: 'pdf',
      name: 'PDF Document',
      description: 'Print-ready PDF version of your portfolio',
      endpoint: '/api/export/pdf',
      fileType: '.pdf',
      features: [
        'Print optimized',
        'Professional layout',
        'Easy to share',
        'Universal format'
      ]
    }
  ];

  res.status(200).json({
    success: true,
    data: exportFormats
  });
});
