import { useState } from 'react';
import { Plus, X, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../../store/portfolioStore';

const ExperienceForm = () => {
  const { portfolioData, addExperience, removeExperience } = usePortfolioStore();
  const [newExp, setNewExp] = useState({
    company: '',
    position: '',
    duration: '',
    location: '',
    description: ''
  });

  const handleAdd = () => {
    if (newExp.company && newExp.position && newExp.duration && newExp.description) {
      addExperience(newExp);
      setNewExp({ company: '', position: '', duration: '', location: '', description: '' });
      toast.success('Experience added!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Work Experience</h2>
        <p className="text-gray-600 dark:text-gray-300">Add your professional work history.</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Building className="w-5 h-5" />
          Add Experience
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name *"
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Position *"
            value={newExp.position}
            onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 2020 - Present) *"
            value={newExp.duration}
            onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={newExp.location}
            onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <textarea
          placeholder="Description *"
          value={newExp.description}
          onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <button
          onClick={handleAdd}
          className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {portfolioData.experience.length > 0 && (
        <div className="space-y-3">
          {portfolioData.experience.map((exp, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company} • {exp.duration}</p>
                </div>
                <button onClick={() => removeExperience(index)} className="text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
