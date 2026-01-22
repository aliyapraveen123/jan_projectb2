/**
 * Sample Portfolio Data
 * Use this as a reference for testing the API
 */

export const samplePortfolioData = {
  personalInfo: {
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev"
  },
  
  about: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. I love solving complex problems and creating elegant solutions that make a difference. When I'm not coding, you can find me contributing to open-source projects or writing technical blog posts.",
  
  skills: [
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Node.js", level: 90, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "MongoDB", level: 80, category: "Database" },
    { name: "PostgreSQL", level: 85, category: "Database" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "AWS", level: 80, category: "DevOps" },
    { name: "Git", level: 90, category: "Tools" },
    { name: "Jest", level: 85, category: "Tools" }
  ],
  
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Implemented microservices architecture for scalability.",
      technologies: ["React", "Node.js", "MongoDB", "Redis", "Stripe", "Docker"],
      link: "https://example-ecommerce.com",
      github: "https://github.com/johndoe/ecommerce-platform",
      image: "https://via.placeholder.com/800x450/667eea/ffffff?text=E-Commerce+Platform",
      featured: true
    },
    {
      title: "AI Chat Application",
      description: "Developed a real-time chat application with AI-powered message suggestions and sentiment analysis. Supports group chats, file sharing, and video calls.",
      technologies: ["React", "Socket.io", "OpenAI", "WebRTC", "PostgreSQL"],
      link: "https://example-chat.com",
      github: "https://github.com/johndoe/ai-chat",
      image: "https://via.placeholder.com/800x450/764ba2/ffffff?text=AI+Chat+App",
      featured: true
    },
    {
      title: "Task Management System",
      description: "Created a collaborative task management tool with Kanban boards, time tracking, and team analytics. Integrated with popular project management tools.",
      technologies: ["Vue.js", "Express", "MongoDB", "Firebase"],
      link: "https://example-tasks.com",
      github: "https://github.com/johndoe/task-manager",
      image: "https://via.placeholder.com/800x450/f093fb/ffffff?text=Task+Manager",
      featured: false
    }
  ],
  
  experience: [
    {
      company: "Tech Innovators Inc.",
      position: "Senior Full Stack Developer",
      duration: "2021 - Present",
      location: "San Francisco, CA",
      description: "Led development of microservices-based applications serving 1M+ users. Architected and implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews to maintain high code quality standards."
    },
    {
      company: "Digital Solutions Co.",
      position: "Full Stack Developer",
      duration: "2019 - 2021",
      location: "San Francisco, CA",
      description: "Developed and maintained multiple client-facing web applications using React and Node.js. Collaborated with cross-functional teams to deliver projects on time. Implemented RESTful APIs and integrated third-party services."
    },
    {
      company: "StartUp Ventures",
      position: "Junior Developer",
      duration: "2018 - 2019",
      location: "San Francisco, CA",
      description: "Assisted in building responsive web applications and fixed bugs across the stack. Participated in agile ceremonies and contributed to sprint planning. Gained hands-on experience with modern development tools and practices."
    }
  ],
  
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      year: "2014 - 2018",
      description: "Graduated with honors. Specialized in software engineering and artificial intelligence. Active member of the Computer Science Club."
    },
    {
      institution: "Online Learning Platform",
      degree: "AWS Certified Solutions Architect",
      field: "Cloud Computing",
      year: "2020",
      description: "Professional certification in AWS cloud services and architecture."
    }
  ],
  
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    website: "https://johndoe.dev"
  },
  
  theme: "minimal",
  colorScheme: "light"
};

/**
 * Sample AI Enhancement Requests
 */
export const sampleAIRequests = {
  enhanceAbout: {
    content: "I am a developer who likes to code and build things. I have experience with web development.",
    type: "about",
    tone: "professional"
  },
  
  enhanceProject: {
    content: "Made a website for shopping. Users can buy products and checkout.",
    type: "project",
    tone: "professional"
  },
  
  enhanceExperience: {
    content: "Worked on various projects. Wrote code and fixed bugs. Worked with team members.",
    type: "experience",
    tone: "professional"
  },
  
  generateDescription: {
    keywords: ["task management", "collaboration", "productivity"],
    technologies: ["React", "Node.js", "MongoDB"]
  }
};

/**
 * Expected AI Responses (for testing without API key)
 */
export const mockAIResponses = {
  about: "Results-driven Full Stack Developer with extensive experience in modern web development. Demonstrated expertise in building scalable applications and implementing best practices. Passionate about leveraging technology to solve real-world problems and deliver exceptional user experiences.",
  
  project: "Developed a comprehensive e-commerce platform featuring secure payment processing, inventory management, and an intuitive user interface. Implemented responsive design principles to ensure seamless shopping experience across all devices.",
  
  experience: "Spearheaded development initiatives across multiple high-impact projects, consistently delivering quality code while adhering to strict deadlines. Collaborated effectively with cross-functional teams to identify and resolve technical challenges, contributing to overall product excellence."
};
