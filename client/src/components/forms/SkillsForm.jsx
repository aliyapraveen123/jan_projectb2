import { useState } from 'react';
import { Plus, X, Award } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const SkillsForm = () => {
  const { portfolioData, addSkill, removeSkill, updateSkill } = usePortfolioStore();
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: '' });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: '', level: 80, category: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skills & Expertise
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your technical skills and rate your proficiency level.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5" />
          Add New Skill
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Skill name (e.g., React)"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          />
          
          <div>
            <input
              type="range"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="w-full"
            />
            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-1">
              Level: {newSkill.level}%
            </p>
          </div>
          
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Skills List */}
      {portfolioData.skills.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Your Skills ({portfolioData.skills.length})
          </h3>
          <div className="grid gap-3">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No skills added yet. Add your first skill above!
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
