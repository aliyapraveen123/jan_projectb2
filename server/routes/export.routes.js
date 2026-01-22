import express from 'express';
import {
  exportHTML,
  exportReact,
  exportPDF,
  getExportInfo
} from '../controllers/export.controller.js';
import { validate, exportSchema } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/export/html
// @desc    Export portfolio as HTML
// @access  Public
router.post('/html', validate(exportSchema), exportHTML);

// @route   POST /api/export/react
// @desc    Export portfolio as React component
// @access  Public
router.post('/react', validate(exportSchema), exportReact);

// @route   POST /api/export/pdf
// @desc    Export portfolio as PDF
// @access  Public
router.post('/pdf', validate(exportSchema), exportPDF);

// @route   GET /api/export/info
// @desc    Get all export formats info
// @access  Public
router.get('/info', getExportInfo);

export default router;
