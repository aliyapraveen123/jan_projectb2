import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Portfolio Store
 * Manages global state for portfolio data
 */
const usePortfolioStore = create(
  persist(
    (set, get) => ({
      // Portfolio data
      portfolioData: {
        personalInfo: {
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          website: ''
        },
        about: '',
        skills: [],
        projects: [],
        experience: [],
        education: [],
        socialLinks: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: '',
          youtube: '',
          website: ''
        },
        theme: 'minimal',
        colorScheme: 'light'
      },

      // Generated portfolio
      generatedPortfolio: null,

      // Completeness score
      completeness: null,

      // Current step in builder
      currentStep: 0,

      // Actions
      updatePersonalInfo: (data) => 
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            personalInfo: { ...state.portfolioData.personalInfo, ...data }
          }
        })),

      updateAbout: (about) =>
        set((state) => ({
          portfolioData: { ...state.portfolioData, about }
        })),

      addSkill: (skill) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            skills: [...state.portfolioData.skills, skill]
          }
        })),

      updateSkill: (index, skill) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            skills: state.portfolioData.skills.map((s, i) => 
              i === index ? skill : s
            )
          }
        })),

      removeSkill: (index) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            skills: state.portfolioData.skills.filter((_, i) => i !== index)
          }
        })),

      addProject: (project) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            projects: [...state.portfolioData.projects, project]
          }
        })),

      updateProject: (index, project) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            projects: state.portfolioData.projects.map((p, i) => 
              i === index ? project : p
            )
          }
        })),

      removeProject: (index) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            projects: state.portfolioData.projects.filter((_, i) => i !== index)
          }
        })),

      addExperience: (exp) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            experience: [...state.portfolioData.experience, exp]
          }
        })),

      updateExperience: (index, exp) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            experience: state.portfolioData.experience.map((e, i) => 
              i === index ? exp : e
            )
          }
        })),

      removeExperience: (index) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            experience: state.portfolioData.experience.filter((_, i) => i !== index)
          }
        })),

      addEducation: (edu) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            education: [...state.portfolioData.education, edu]
          }
        })),

      updateEducation: (index, edu) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            education: state.portfolioData.education.map((e, i) => 
              i === index ? edu : e
            )
          }
        })),

      removeEducation: (index) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            education: state.portfolioData.education.filter((_, i) => i !== index)
          }
        })),

      updateSocialLinks: (links) =>
        set((state) => ({
          portfolioData: {
            ...state.portfolioData,
            socialLinks: { ...state.portfolioData.socialLinks, ...links }
          }
        })),

      updateTheme: (theme) =>
        set((state) => ({
          portfolioData: { ...state.portfolioData, theme }
        })),

      updateColorScheme: (colorScheme) =>
        set((state) => ({
          portfolioData: { ...state.portfolioData, colorScheme }
        })),

      setGeneratedPortfolio: (portfolio) =>
        set({ generatedPortfolio: portfolio }),

      setCompleteness: (completeness) =>
        set({ completeness }),

      setCurrentStep: (step) =>
        set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () =>
        set((state) => ({ 
          currentStep: Math.max(0, state.currentStep - 1) 
        })),

      resetPortfolio: () =>
        set({
          portfolioData: {
            personalInfo: {
              name: '',
              title: '',
              email: '',
              phone: '',
              location: '',
              website: ''
            },
            about: '',
            skills: [],
            projects: [],
            experience: [],
            education: [],
            socialLinks: {
              github: '',
              linkedin: '',
              twitter: '',
              instagram: '',
              youtube: '',
              website: ''
            },
            theme: 'minimal',
            colorScheme: 'light'
          },
          generatedPortfolio: null,
          completeness: null,
          currentStep: 0
        }),

      // Load sample data
      loadSampleData: () =>
        set({
          portfolioData: {
            personalInfo: {
              name: 'John Doe',
              title: 'Full Stack Developer',
              email: 'john@example.com',
              phone: '+1 234 567 8900',
              location: 'San Francisco, CA',
              website: 'https://johndoe.dev'
            },
            about: 'Passionate developer with 5+ years of experience building web applications.',
            skills: [
              { name: 'React', level: 90, category: 'Frontend' },
              { name: 'Node.js', level: 85, category: 'Backend' },
              { name: 'MongoDB', level: 80, category: 'Database' }
            ],
            projects: [
              {
                title: 'E-Commerce Platform',
                description: 'Built a full-stack e-commerce solution',
                technologies: ['React', 'Node.js', 'MongoDB'],
                link: 'https://example.com',
                github: 'https://github.com/example',
                image: '',
                featured: true
              }
            ],
            experience: [
              {
                company: 'Tech Corp',
                position: 'Senior Developer',
                duration: '2020 - Present',
                location: 'San Francisco, CA',
                description: 'Led development of microservices architecture'
              }
            ],
            education: [
              {
                institution: 'University of Technology',
                degree: 'B.S. Computer Science',
                field: 'Computer Science',
                year: '2019',
                description: ''
              }
            ],
            socialLinks: {
              github: 'https://github.com/johndoe',
              linkedin: 'https://linkedin.com/in/johndoe',
              twitter: 'https://twitter.com/johndoe',
              instagram: '',
              youtube: '',
              website: 'https://johndoe.dev'
            },
            theme: 'minimal',
            colorScheme: 'light'
          }
        })
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ 
        portfolioData: state.portfolioData,
        currentStep: state.currentStep
      })
    }
  )
);

export default usePortfolioStore;
