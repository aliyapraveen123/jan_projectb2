import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import usePortfolioStore from '../store/portfolioStore';
import PortfolioPreview from '../components/portfolio/PortfolioPreview';

const Preview = () => {
  const navigate = useNavigate();
  const { generatedPortfolio, completeness } = usePortfolioStore();

  if (!generatedPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Portfolio Generated</h2>
          <button
            onClick={() => navigate('/builder')}
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Go to Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </button>

            <div className="flex gap-3">
              {completeness && (
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                  Completeness: {completeness.percentage}%
                </div>
              )}
              <button
                onClick={() => navigate('/builder')}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => navigate('/export')}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <PortfolioPreview portfolio={generatedPortfolio} />
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
