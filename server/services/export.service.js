import htmlPdf from 'html-pdf-node';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

/**
 * Export Service
 * Handles HTML, React, and PDF exports
 */
class ExportService {
  /**
   * Export portfolio as static HTML
   * @param {Object} portfolioData - Portfolio data
   * @returns {string} HTML string
   */
  async exportAsHTML(portfolioData) {
    const { theme = 'minimal', colorScheme = 'light' } = portfolioData.metadata || {};
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${this.escapeHtml(portfolioData.seo?.description || '')}">
    <meta name="keywords" content="${this.escapeHtml(portfolioData.seo?.keywords || '')}">
    <meta name="author" content="${this.escapeHtml(portfolioData.personalInfo.name)}">
    <title>${this.escapeHtml(portfolioData.seo?.title || portfolioData.personalInfo.name)}</title>
    ${this.generateStyles(theme, colorScheme)}
</head>
<body class="${colorScheme}">
    ${this.generateHTMLContent(portfolioData, theme)}
    ${this.generateScripts()}
</body>
</html>`;

    return html;
  }

  /**
   * Export portfolio as React component template
   * @param {Object} portfolioData - Portfolio data
   * @returns {Object} React files structure
   */
  async exportAsReact(portfolioData) {
    const componentCode = this.generateReactComponent(portfolioData);
    const dataFile = this.generateDataFile(portfolioData);
    const stylesFile = this.generateReactStyles(portfolioData.metadata?.theme || 'minimal');

    return {
      'Portfolio.jsx': componentCode,
      'portfolioData.js': dataFile,
      'portfolio.css': stylesFile,
      'README.md': this.generateReactReadme()
    };
  }

  /**
   * Export portfolio as PDF
   * @param {Object} portfolioData - Portfolio data
   * @returns {Buffer} PDF buffer
   */
  async exportAsPDF(portfolioData) {
    const html = await this.exportAsHTML(portfolioData);
    
    const options = {
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: true
    };

    const file = { content: html };

    try {
      const pdfBuffer = await htmlPdf.generatePdf(file, options);
      return pdfBuffer;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  /**
   * Generate CSS styles based on theme
   */
  generateStyles(theme, colorScheme) {
    const themes = {
      minimal: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#0ea5e9',
        background: colorScheme === 'dark' ? '#0f172a' : '#ffffff',
        text: colorScheme === 'dark' ? '#f1f5f9' : '#1e293b',
        card: colorScheme === 'dark' ? '#1e293b' : '#f8fafc'
      },
      creative: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: colorScheme === 'dark' ? '#18181b' : '#ffffff',
        text: colorScheme === 'dark' ? '#fafafa' : '#18181b',
        card: colorScheme === 'dark' ? '#27272a' : '#fafafa'
      },
      professional: {
        primary: '#0f172a',
        secondary: '#475569',
        accent: '#06b6d4',
        background: colorScheme === 'dark' ? '#020617' : '#ffffff',
        text: colorScheme === 'dark' ? '#e2e8f0' : '#0f172a',
        card: colorScheme === 'dark' ? '#1e293b' : '#f1f5f9'
      }
    };

    const colors = themes[theme] || themes.minimal;

    return `<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --color-primary: ${colors.primary};
            --color-secondary: ${colors.secondary};
            --color-accent: ${colors.accent};
            --color-background: ${colors.background};
            --color-text: ${colors.text};
            --color-card: ${colors.card};
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: var(--color-text);
            background-color: var(--color-background);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
            color: white;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .hero p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .btn-primary {
            background: white;
            color: var(--color-primary);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        /* Section Styles */
        section {
            padding: 80px 20px;
        }

        section h2 {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
            color: var(--color-primary);
        }

        /* About Section */
        .about-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
            line-height: 1.8;
        }

        /* Skills Section */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .skill-category {
            background: var(--color-card);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .skill-category h3 {
            margin-bottom: 1.5rem;
            color: var(--color-primary);
        }

        .skill-item {
            margin-bottom: 1rem;
        }

        .skill-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .skill-bar {
            height: 8px;
            background: rgba(0,0,0,0.1);
            border-radius: 4px;
            overflow: hidden;
        }

        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            border-radius: 4px;
            transition: width 1s ease;
        }

        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: var(--color-card);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .project-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .project-content {
            padding: 1.5rem;
        }

        .project-title {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--color-primary);
        }

        .project-description {
            margin-bottom: 1rem;
            color: var(--color-secondary);
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .tech-tag {
            padding: 4px 12px;
            background: var(--color-primary);
            color: white;
            border-radius: 20px;
            font-size: 0.85rem;
        }

        .project-links {
            display: flex;
            gap: 1rem;
        }

        .project-link {
            color: var(--color-accent);
            text-decoration: none;
            font-weight: 600;
        }

        /* Experience & Education */
        .timeline {
            max-width: 900px;
            margin: 0 auto;
        }

        .timeline-item {
            background: var(--color-card);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            border-left: 4px solid var(--color-primary);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .timeline-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--color-primary);
        }

        .timeline-subtitle {
            font-size: 1.1rem;
            color: var(--color-secondary);
            margin-bottom: 0.5rem;
        }

        .timeline-duration {
            color: var(--color-accent);
            font-weight: 600;
        }

        .timeline-description {
            line-height: 1.8;
        }

        /* Contact Section */
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }

        .contact-item {
            text-align: center;
            padding: 2rem;
            background: var(--color-card);
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .contact-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }

        .contact-value {
            font-weight: 600;
            color: var(--color-text);
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 3rem;
        }

        .social-link {
            display: inline-block;
            padding: 12px;
            background: var(--color-primary);
            color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            transform: scale(1.1);
            background: var(--color-accent);
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 2rem;
            background: var(--color-card);
            color: var(--color-secondary);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.2rem;
            }

            section h2 {
                font-size: 2rem;
            }

            .projects-grid,
            .skills-grid {
                grid-template-columns: 1fr;
            }
        }

        @media print {
            .hero {
                min-height: auto;
                padding: 40px 20px;
            }

            section {
                padding: 40px 20px;
                page-break-inside: avoid;
            }

            .btn {
                display: none;
            }
        }
    </style>`;
  }

  /**
   * Generate HTML content
   */
  generateHTMLContent(data, theme) {
    return `
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${this.escapeHtml(data.personalInfo.name)}</h1>
            <p>${this.escapeHtml(data.personalInfo.title)}</p>
            <div class="cta-buttons">
                <a href="#projects" class="btn btn-primary">View Projects</a>
                <a href="#contact" class="btn btn-secondary">Contact Me</a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <p>${this.escapeHtml(data.about.content)}</p>
            </div>
        </div>
    </section>

    ${data.skills && data.skills.length > 0 ? this.generateSkillsHTML(data.skills) : ''}
    ${data.projects && data.projects.length > 0 ? this.generateProjectsHTML(data.projects) : ''}
    ${data.experience && data.experience.length > 0 ? this.generateExperienceHTML(data.experience) : ''}
    ${data.education && data.education.length > 0 ? this.generateEducationHTML(data.education) : ''}
    ${this.generateContactHTML(data.contact, data.socialLinks)}

    <footer>
        <p>&copy; ${new Date().getFullYear()} ${this.escapeHtml(data.personalInfo.name)}. All rights reserved.</p>
        <p>Generated with AI Portfolio Generator</p>
    </footer>
    `;
  }

  /**
   * Generate skills HTML
   */
  generateSkillsHTML(skills) {
    return `
    <section id="skills">
        <div class="container">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${skills.map(category => `
                    <div class="skill-category">
                        <h3>${this.escapeHtml(category.category)}</h3>
                        ${category.skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-name">
                                    <span>${this.escapeHtml(skill.name)}</span>
                                    <span>${skill.level}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
  }

  /**
   * Generate projects HTML
   */
  generateProjectsHTML(projects) {
    return `
    <section id="projects">
        <div class="container">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${projects.map(project => `
                    <div class="project-card">
                        <img src="${this.escapeHtml(project.image)}" alt="${this.escapeHtml(project.title)}" class="project-image">
                        <div class="project-content">
                            <h3 class="project-title">${this.escapeHtml(project.title)}</h3>
                            <p class="project-description">${this.escapeHtml(project.description)}</p>
                            ${project.technologies && project.technologies.length > 0 ? `
                                <div class="project-tech">
                                    ${project.technologies.map(tech => `
                                        <span class="tech-tag">${this.escapeHtml(tech)}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            <div class="project-links">
                                ${project.link ? `<a href="${this.escapeHtml(project.link)}" class="project-link" target="_blank">View Live</a>` : ''}
                                ${project.github ? `<a href="${this.escapeHtml(project.github)}" class="project-link" target="_blank">GitHub</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
  }

  /**
   * Generate experience HTML
   */
  generateExperienceHTML(experience) {
    return `
    <section id="experience">
        <div class="container">
            <h2>Experience</h2>
            <div class="timeline">
                ${experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${this.escapeHtml(exp.position)}</div>
                                <div class="timeline-subtitle">${this.escapeHtml(exp.company)}</div>
                            </div>
                            <div class="timeline-duration">${this.escapeHtml(exp.duration)}</div>
                        </div>
                        <p class="timeline-description">${this.escapeHtml(exp.description)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
  }

  /**
   * Generate education HTML
   */
  generateEducationHTML(education) {
    return `
    <section id="education">
        <div class="container">
            <h2>Education</h2>
            <div class="timeline">
                ${education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${this.escapeHtml(edu.degree)}</div>
                                <div class="timeline-subtitle">${this.escapeHtml(edu.institution)}</div>
                            </div>
                            <div class="timeline-duration">${this.escapeHtml(edu.year)}</div>
                        </div>
                        ${edu.description ? `<p class="timeline-description">${this.escapeHtml(edu.description)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
  }

  /**
   * Generate contact HTML
   */
  generateContactHTML(contact, socialLinks) {
    return `
    <section id="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <div class="contact-grid">
                ${contact.methods.map(method => `
                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div class="contact-value">
                            ${method.link ? `<a href="${this.escapeHtml(method.link)}">${this.escapeHtml(method.value)}</a>` : this.escapeHtml(method.value)}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${Object.keys(socialLinks).length > 0 ? `
                <div class="social-links">
                    ${Object.entries(socialLinks).map(([platform, data]) => `
                        <a href="${this.escapeHtml(data.url)}" class="social-link" target="_blank" title="${platform}">
                            ${platform[0].toUpperCase()}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    </section>
    `;
  }

  /**
   * Generate scripts
   */
  generateScripts() {
    return `
    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Animate skill bars on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width;
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.dataset.width = bar.style.width;
            bar.style.width = '0%';
            observer.observe(bar);
        });
    </script>
    `;
  }

  /**
   * Generate React component
   */
  generateReactComponent(data) {
    return `import React from 'react';
import './portfolio.css';
import portfolioData from './portfolioData';

const Portfolio = () => {
  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>{portfolioData.personalInfo.name}</h1>
          <p>{portfolioData.personalInfo.title}</p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </section>

      {/* Add other sections here following the HTML structure */}
      {/* This is a template - customize as needed */}
      
      <footer>
        <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;`;
  }

  /**
   * Generate data file for React
   */
  generateDataFile(data) {
    return `const portfolioData = ${JSON.stringify(data, null, 2)};

export default portfolioData;`;
  }

  /**
   * Generate React styles
   */
  generateReactStyles(theme) {
    return this.generateStyles(theme, 'light').replace(/<\/?style>/g, '');
  }

  /**
   * Generate React README
   */
  generateReactReadme() {
    return `# React Portfolio Component

## Installation

1. Copy all files to your React project
2. Import the Portfolio component:

\`\`\`jsx
import Portfolio from './Portfolio';

function App() {
  return <Portfolio />;
}
\`\`\`

3. Customize \`portfolioData.js\` with your information
4. Modify styles in \`portfolio.css\` as needed

## Customization

- Edit \`portfolioData.js\` to update content
- Modify \`Portfolio.jsx\` to change structure
- Update \`portfolio.css\` for styling changes

Built with React and ❤️
`;
  }

  /**
   * Escape HTML special characters
   */
  escapeHtml(text) {
    if (!text) return '';
    return purify.sanitize(text, { ALLOWED_TAGS: [] });
  }
}

// Export singleton instance
export default new ExportService();
