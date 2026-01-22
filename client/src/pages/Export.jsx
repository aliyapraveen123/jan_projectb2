import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileCode, FileText, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../store/portfolioStore';
import { exportApi } from '../services/api';
import { downloadFile, downloadText, copyToClipboard } from '../utils/helpers';

const Export = () => {
  const navigate = useNavigate();
  const { generatedPortfolio } = usePortfolioStore();
  const [loading, setLoading] = useState({ html: false, react: false, pdf: false });
  const [copiedHTML, setCopiedHTML] = useState(false);

  if (!generatedPortfolio) {
    navigate('/builder');
    return null;
  }

  const handleExportHTML = async () => {
    setLoading({ ...loading, html: true });
    try {
      const result = await exportApi.exportHTML(generatedPortfolio);
      downloadText(result.data.html, result.data.filename, 'text/html');
      toast.success('HTML exported successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export HTML');
    } finally {
      setLoading({ ...loading, html: false });
    }
  };

  const handleExportReact = async () => {
    setLoading({ ...loading, react: true });
    try {
      const result = await exportApi.exportReact(generatedPortfolio);
      // Create zip-like structure message
      toast.success('React files ready! Check console for files.');
      console.log('React Files:', result.data.files);
      
      // Download each file
      Object.entries(result.data.files).forEach(([filename, content]) => {
        downloadText(content, filename, 'text/plain');
      });
    } catch (error) {
      toast.error(error.message || 'Failed to export React');
    } finally {
      setLoading({ ...loading, react: false });
    }
  };

  const handleExportPDF = async () => {
    setLoading({ ...loading, pdf: true });
    try {
      const pdfBlob = await exportApi.exportPDF(generatedPortfolio);
      downloadFile(
        pdfBlob,
        `${generatedPortfolio.personalInfo.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.pdf`
      );
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export PDF');
    } finally {
      setLoading({ ...loading, pdf: false });
    }
  };

  const handleCopyHTML = async () => {
    setLoading({ ...loading, html: true });
    try {
      const result = await exportApi.exportHTML(generatedPortfolio);
      const success = await copyToClipboard(result.data.html);
      if (success) {
        setCopiedHTML(true);
        toast.success('HTML copied to clipboard!');
        setTimeout(() => setCopiedHTML(false), 2000);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to copy HTML');
    } finally {
      setLoading({ ...loading, html: false });
    }
  };

  const exportOptions = [
    {
      id: 'html',
      title: 'Static HTML',
      description: 'Single HTML file with embedded CSS and JavaScript',
      icon: <FileCode className="w-8 h-8" />,
      features: ['Fully responsive', 'No dependencies', 'Easy to host', 'SEO optimized'],
      action: handleExportHTML,
      copyAction: handleCopyHTML,
    },
    {
      id: 'react',
      title: 'React Component',
      description: 'React component template with separate data file',
      icon: <FileCode className="w-8 h-8" />,
      features: ['Modular structure', 'Easy to customize', 'Reusable', 'Modern practices'],
      action: handleExportReact,
    },
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Print-ready PDF version of your portfolio',
      icon: <FileText className="w-8 h-8" />,
      features: ['Print optimized', 'Professional layout', 'Easy to share', 'Universal format'],
      action: handleExportPDF,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/preview')}
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Preview
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Export Your Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose your preferred format and download your portfolio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {exportOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-hover"
            >
              <div className="text-primary mb-4">{option.icon}</div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {option.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {option.description}
              </p>

              <ul className="space-y-2 mb-6">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <button
                  onClick={option.action}
                  disabled={loading[option.id]}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading[option.id] ? (
                    <>
                      <div className="spinner" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download {option.title}
                    </>
                  )}
                </button>

                {option.copyAction && (
                  <button
                    onClick={option.copyAction}
                    disabled={loading[option.id]}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
                  >
                    {copiedHTML ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy HTML
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What's Next?
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>HTML:</strong> Upload the file to any web hosting service (Netlify, Vercel, GitHub Pages)</p>
            <p><strong>React:</strong> Import the component into your React application and customize as needed</p>
            <p><strong>PDF:</strong> Share directly with recruiters or print for physical copies</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Export;
