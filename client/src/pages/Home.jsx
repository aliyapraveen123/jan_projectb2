import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Layout, 
  Download, 
  Code, 
  Eye,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import usePortfolioStore from '../store/portfolioStore';

const Home = () => {
  const navigate = useNavigate();
  const loadSampleData = usePortfolioStore((state) => state.loadSampleData);
  const resetPortfolio = usePortfolioStore((state) => state.resetPortfolio);

  const handleGetStarted = () => {
    // Force clear everything before starting
    resetPortfolio();
    localStorage.removeItem('portfolio-storage');
    navigate('/builder');
  };

  const handleTryDemo = () => {
    loadSampleData();
    navigate('/builder');
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Enhancement',
      description: 'Automatically refine and rewrite your content to be professional and impactful',
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Multiple Themes',
      description: 'Choose from Minimal, Creative, or Professional themes to match your style',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Live Preview',
      description: 'See real-time changes as you build your portfolio',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Multiple Export Options',
      description: 'Export as HTML, React component, or PDF for maximum flexibility',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast & Easy',
      description: 'Create a professional portfolio in minutes, not hours',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'No Coding Required',
      description: 'Build stunning portfolios without writing a single line of code',
    },
  ];

  const steps = [
    { number: '01', title: 'Enter Your Information', description: 'Fill in your personal details, skills, projects, and experience' },
    { number: '02', title: 'AI Enhancement', description: 'Let AI refine your content to be professional and recruiter-friendly' },
    { number: '03', title: 'Choose Theme', description: 'Select from beautiful pre-designed themes' },
    { number: '04', title: 'Export & Share', description: 'Download as HTML, React, or PDF and share with the world' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Portfolio Generator</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Create Your{' '}
              <span className="gradient-text">
                Professional Portfolio
              </span>
              <br />
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Build stunning portfolio websites without coding. Let AI enhance your content 
              and choose from beautiful themes. Export as HTML, React, or PDF.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTryDemo}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 dark:border-gray-700"
              >
                Try Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Generator?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to create a stunning portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Four simple steps to your professional portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have created stunning portfolios with our AI-powered generator
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Start Building Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AI Portfolio Generator. Built with ❤️ using React, Node.js, and AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
