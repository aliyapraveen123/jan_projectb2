import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../../store/portfolioStore';
import { aiApi } from '../../services/api';
import Textarea from '../ui/Textarea';

const AboutForm = () => {
  const { portfolioData, updateAbout } = usePortfolioStore();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { about: portfolioData.about }
  });
  const [enhancing, setEnhancing] = useState(false);
  const aboutValue = watch('about');

  const onSubmit = (data) => {
    updateAbout(data.about);
  };

  const handleEnhance = async () => {
    if (!aboutValue || aboutValue.trim().length < 10) {
      toast.error('Please write at least a few sentences before enhancing');
      return;
    }

    setEnhancing(true);
    try {
      const result = await aiApi.enhanceContent(aboutValue, 'about', 'professional');
      setValue('about', result.data.enhanced);
      updateAbout(result.data.enhanced);
      toast.success('Content enhanced successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to enhance content');
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          About You
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Write a brief introduction about yourself and your professional background.
        </p>
      </div>

      <div>
        <Textarea
          label="About Me"
          placeholder="Tell your story... (e.g., I'm a passionate developer with 5+ years of experience...)"
          rows={8}
          error={errors.about?.message}
          {...register('about', { 
            required: 'About section is required',
            minLength: {
              value: 50,
              message: 'Please write at least 50 characters'
            }
          })}
        />
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {aboutValue?.length || 0} characters
          </span>
          <button
            type="button"
            onClick={handleEnhance}
            disabled={enhancing || !aboutValue}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {enhancing ? 'Enhancing...' : 'Enhance with AI'}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Tips for a great About section:</h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Mention your years of experience</li>
          <li>Highlight your key skills and expertise</li>
          <li>Share what you're passionate about</li>
          <li>Keep it concise (150-300 words)</li>
        </ul>
      </div>
    </form>
  );
};

export default AboutForm;
