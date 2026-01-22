import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../store/portfolioStore';
import { portfolioApi } from '../services/api';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import AboutForm from '../components/forms/AboutForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SocialLinksForm from '../components/forms/SocialLinksForm';
import ThemeSelector from '../components/forms/ThemeSelector';

const steps = [
  { id: 0, title: 'Personal Info', component: PersonalInfoForm },
  { id: 1, title: 'About', component: AboutForm },
  { id: 2, title: 'Skills', component: SkillsForm },
  { id: 3, title: 'Projects', component: ProjectsForm },
  { id: 4, title: 'Experience', component: ExperienceForm },
  { id: 5, title: 'Education', component: EducationForm },
  { id: 6, title: 'Social Links', component: SocialLinksForm },
  { id: 7, title: 'Theme', component: ThemeSelector },
];

const Builder = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    portfolioData,
    setGeneratedPortfolio,
    setCompleteness,
  } = usePortfolioStore();

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      nextStep();
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    } else {
      navigate('/');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await portfolioApi.generate(portfolioData);
      setGeneratedPortfolio(result.data.portfolio);
      setCompleteness(result.data.completeness);
      toast.success('Portfolio generated successfully!');
      navigate('/preview');
    } catch (error) {
      toast.error(error.message || 'Failed to generate portfolio');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = async () => {
    setIsGenerating(true);
    try {
      const result = await portfolioApi.preview(portfolioData);
      setGeneratedPortfolio(result.data.preview);
      navigate('/preview');
    } catch (error) {
      toast.error(error.message || 'Failed to preview portfolio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Build Your Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex-1 text-center py-2 text-sm font-medium transition-colors ${
                  index === currentStep
                    ? 'text-primary'
                    : index < currentStep
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
        >
          <CurrentStepComponent />
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Home' : 'Back'}
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleNext}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  {isGenerating ? 'Generating...' : 'Generate'}
                  <Save className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
