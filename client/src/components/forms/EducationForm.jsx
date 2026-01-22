import { useState } from 'react';
import { Plus, X, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../../store/portfolioStore';

const EducationForm = () => {
  const { portfolioData, addEducation, removeEducation } = usePortfolioStore();
  const [newEdu, setNewEdu] = useState({
    institution: '',
    degree: '',
    field: '',
    year: '',
    description: ''
  });

  const handleAdd = () => {
    if (newEdu.institution && newEdu.degree && newEdu.year) {
      addEducation(newEdu);
      setNewEdu({ institution: '', degree: '', field: '', year: '', description: '' });
      toast.success('Education added!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Education</h2>
        <p className="text-gray-600 dark:text-gray-300">Add your educational background.</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Add Education
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Institution *"
            value={newEdu.institution}
            onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Degree *"
            value={newEdu.degree}
            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={newEdu.field}
            onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Year *"
            value={newEdu.year}
            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {portfolioData.education.length > 0 && (
        <div className="space-y-3">
          {portfolioData.education.map((edu, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution} • {edu.year}</p>
                </div>
                <button onClick={() => removeEducation(index)} className="text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
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

export default EducationForm;
