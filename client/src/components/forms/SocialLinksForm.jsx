import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const SocialLinksForm = () => {
  const { portfolioData, updateSocialLinks } = usePortfolioStore();

  const handleChange = (platform, value) => {
    updateSocialLinks({ [platform]: value });
  };

  const socialPlatforms = [
    { id: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@username' },
    { id: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Social Links</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your social media profiles and website.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.id}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Icon className="w-4 h-4 inline mr-2" />
                {platform.label}
              </label>
              <input
                type="url"
                value={portfolioData.socialLinks[platform.id] || ''}
                onChange={(e) => handleChange(platform.id, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksForm;
