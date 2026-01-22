import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../../store/portfolioStore';
import { portfolioApi } from '../../services/api';

const ThemeSelector = () => {
  const { portfolioData, updateTheme, updateColorScheme } = usePortfolioStore();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      const result = await portfolioApi.getThemes();
      setThemes(result.data);
    } catch (error) {
      toast.error('Failed to load themes');
      // Fallback themes
      setThemes([
        { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
        { id: 'creative', name: 'Creative', description: 'Bold and colorful' },
        { id: 'professional', name: 'Professional', description: 'Corporate style' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Theme</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a theme that matches your style and personality.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading themes...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                updateTheme(theme.id);
                toast.success(`Theme changed to ${theme.name}`);
              }}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                portfolioData.theme === theme.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{theme.description}</p>
            </button>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Color Scheme</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              updateColorScheme('light');
              toast.success('Light mode selected');
            }}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              portfolioData.colorScheme === 'light'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">☀️</div>
              <div className="font-medium text-gray-900 dark:text-white">Light</div>
            </div>
          </button>
          <button
            onClick={() => {
              updateColorScheme('dark');
              toast.success('Dark mode selected');
            }}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              portfolioData.colorScheme === 'dark'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🌙</div>
              <div className="font-medium text-gray-900 dark:text-white">Dark</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
