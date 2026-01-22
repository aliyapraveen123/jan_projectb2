import { useState } from 'react';
import { Plus, X, Briefcase, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import usePortfolioStore from '../../store/portfolioStore';
import { aiApi } from '../../services/api';

const ProjectsForm = () => {
  const { portfolioData, addProject, removeProject } = usePortfolioStore();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    github: '',
    image: '',
    featured: false
  });
  const [techInput, setTechInput] = useState('');
  const [enhancing, setEnhancing] = useState(false);

  const handleAddTech = () => {
    if (techInput.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (index) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index)
    });
  };

  const handleEnhance = async () => {
    if (!newProject.description || newProject.description.length < 10) {
      toast.error('Write a brief description first');
      return;
    }

    setEnhancing(true);
    try {
      const result = await aiApi.enhanceContent(newProject.description, 'project');
      setNewProject({ ...newProject, description: result.data.enhanced });
      toast.success('Description enhanced!');
    } catch (error) {
      toast.error('Failed to enhance');
    } finally {
      setEnhancing(false);
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject(newProject);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        link: '',
        github: '',
        image: '',
        featured: false
      });
      toast.success('Project added!');
    } else {
      toast.error('Title and description are required');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Showcase your best work and projects.
        </p>
      </div>

      {/* Add New Project */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Add New Project
        </h3>
        
        <input
          type="text"
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <div>
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleEnhance}
            disabled={enhancing}
            className="mt-2 text-sm flex items-center gap-1 text-purple-600 hover:text-purple-700"
          >
            <Sparkles className="w-4 h-4" />
            {enhancing ? 'Enhancing...' : 'Enhance with AI'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Live Link (optional)"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="url"
            placeholder="GitHub Link (optional)"
            value={newProject.github}
            onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add technology (e.g., React)"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleAddTech}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
            >
              Add
            </button>
          </div>
          {newProject.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm"
                >
                  {tech}
                  <button onClick={() => handleRemoveTech(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAddProject}
          className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      {portfolioData.projects.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Your Projects ({portfolioData.projects.length})
          </h3>
          <div className="space-y-4">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h4>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
