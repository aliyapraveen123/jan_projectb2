import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const PortfolioPreview = ({ portfolio }) => {
  if (!portfolio) return null;

  const { portfolioData } = usePortfolioStore();
  const isDark = portfolioData.colorScheme === 'dark';

  const { personalInfo, about, skills, projects, experience, education, contact, socialLinks } = portfolio;

  return (
    <div className={`portfolio-preview ${isDark ? 'dark' : ''}`}>
      <div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20 px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          {personalInfo.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl mb-6 opacity-90"
        >
          {personalInfo.title}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 justify-center"
        >
          <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold">
            View Projects
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold">
            Contact Me
          </button>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-16 space-y-16">
        {/* About Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {about.content}
          </p>
        </section>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((category, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-primary hover:underline flex items-center gap-1 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-primary hover:underline flex items-center gap-1 text-sm"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{exp.company}</p>
                    </div>
                    <span className="text-primary font-medium">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{edu.institution}</p>
                    </div>
                    <span className="text-primary font-medium">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {contact.methods.map((method, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl mb-2">📧</div>
                <a href={method.link} className="text-gray-900 dark:text-white hover:text-primary">
                  {method.value}
                </a>
              </div>
            ))}
          </div>
          {socialLinks && Object.values(socialLinks).some(link => link) && (
            <div className="flex justify-center gap-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github.url || socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 text-white rounded-full hover:bg-primary transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin.url || socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter.url || socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-400 text-white rounded-full hover:bg-primary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-900 text-white'}`}>
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Generated with AI Portfolio Generator</p>
      </footer>
      </div>
    </div>
  );
};

export default PortfolioPreview;
