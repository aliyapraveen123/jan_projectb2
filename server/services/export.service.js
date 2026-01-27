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
      preferCSSPageSize: true,
      timeout: 60000, // Increase timeout to 60 seconds
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] // Additional puppeteer args for reliability
    };

    const file = { content: html };

    try {
      console.log('Generating PDF...');
      const pdfBuffer = await htmlPdf.generatePdf(file, options);
      console.log('PDF generated successfully');
      return pdfBuffer;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF: ' + error.message);
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: var(--color-text);
            background-color: var(--color-background);
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Hero Section - Enhanced for Recruiters */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 80px 20px;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
            animation: pulse 15s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 900px;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.2;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.8s ease-out;
        }

        .hero p {
            font-size: 1.5rem;
            margin-bottom: 2.5rem;
            opacity: 0.95;
            font-weight: 400;
            animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .btn {
            padding: 14px 36px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
            font-size: 1.1rem;
            cursor: pointer;
        }

        .btn-primary {
            background: white;
            color: var(--color-primary);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }

        .btn-primary:hover {
            background: rgba(255,255,255,0.95);
        }

        .btn-secondary:hover {
            background: rgba(255,255,255,0.1);
        }

        /* Section Styles - Enhanced */
        section {
            padding: 100px 20px;
            position: relative;
        }

        section h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-align: center;
            color: var(--color-primary);
            font-weight: 800;
            letter-spacing: -0.02em;
        }

        section .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: var(--color-secondary);
            margin-bottom: 4rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        /* About Section - Enhanced */
        .about-content {
            max-width: 850px;
            margin: 0 auto;
            font-size: 1.2rem;
            line-height: 1.9;
            background: var(--color-card);
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
        }

        /* Skills Section - Enhanced */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
        }

        .skill-category {
            background: var(--color-card);
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }

        .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .skill-category h3 {
            margin-bottom: 2rem;
            color: var(--color-primary);
            font-size: 1.5rem;
            font-weight: 700;
        }

        .skill-item {
            margin-bottom: 1.5rem;
        }

        .skill-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.7rem;
            font-weight: 600;
            font-size: 1.05rem;
        }

        .skill-bar {
            height: 10px;
            background: rgba(0,0,0,0.08);
            border-radius: 10px;
            overflow: hidden;
        }

        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            border-radius: 10px;
            transition: width 1s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* Projects Section - Enhanced for Recruiters */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2.5rem;
        }

        .project-card {
            background: var(--color-card);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }

        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 50px rgba(0,0,0,0.15);
        }

        .project-card:hover::before {
            opacity: 1;
        }

        .project-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            font-weight: 700;
        }

        .project-content {
            padding: 2rem;
        }

        .project-title {
            font-size: 1.6rem;
            margin-bottom: 0.8rem;
            color: var(--color-primary);
            font-weight: 700;
        }

        .project-description {
            margin-bottom: 1.5rem;
            color: var(--color-secondary);
            line-height: 1.7;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            margin-bottom: 1.5rem;
        }

        .tech-tag {
            padding: 6px 14px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .project-links {
            display: flex;
            gap: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(0,0,0,0.08);
        }

        .project-link {
            color: var(--color-accent);
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .project-link:hover {
            color: var(--color-primary);
            transform: translateX(3px);
        }

        /* Featured Project Badge */
        .featured-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--color-accent);
            color: white;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 700;
            z-index: 1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* Experience & Education - Enhanced Timeline */
        .timeline {
            max-width: 950px;
            margin: 0 auto;
            position: relative;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
            border-radius: 3px;
        }

        .timeline-item {
            background: var(--color-card);
            padding: 2.5rem;
            border-radius: 16px;
            margin-bottom: 2.5rem;
            margin-left: 40px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
            position: relative;
            transition: all 0.3s ease;
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -52px;
            top: 35px;
            width: 20px;
            height: 20px;
            background: var(--color-accent);
            border: 4px solid var(--color-background);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .timeline-item:hover {
            transform: translateX(5px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .timeline-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-primary);
        }

        .timeline-subtitle {
            font-size: 1.2rem;
            color: var(--color-secondary);
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        .timeline-meta {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
        }

        .timeline-duration {
            color: var(--color-accent);
            font-weight: 700;
            background: rgba(6, 182, 212, 0.1);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.95rem;
        }

        .timeline-location {
            color: var(--color-secondary);
            font-size: 0.95rem;
        }

        .timeline-description {
            line-height: 1.8;
            font-size: 1.05rem;
            color: var(--color-text);
        }

        /* Contact Section - Enhanced */
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
            max-width: 1000px;
            margin: 0 auto;
        }

        .contact-item {
            text-align: center;
            padding: 2.5rem;
            background: var(--color-card);
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }

        .contact-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .contact-icon {
            font-size: 2.5rem;
            margin-bottom: 1.2rem;
            color: var(--color-primary);
        }

        .contact-label {
            font-size: 0.95rem;
            color: var(--color-secondary);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .contact-value {
            font-weight: 600;
            color: var(--color-text);
            font-size: 1.1rem;
            word-break: break-word;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 4rem;
            flex-wrap: wrap;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            color: white;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-size: 1.5rem;
        }

        .social-link:hover {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        /* Footer - Enhanced */
        footer {
            text-align: center;
            padding: 3rem 2rem;
            background: var(--color-card);
            color: var(--color-secondary);
            border-top: 1px solid rgba(0,0,0,0.05);
            margin-top: 80px;
        }

        footer p {
            font-size: 1.05rem;
        }

        /* Stats/Highlights Section */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 3rem auto;
        }

        .stat-item {
            text-align: center;
            padding: 2rem;
            background: var(--color-card);
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: var(--color-primary);
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .stat-label {
            color: var(--color-secondary);
            font-weight: 600;
            font-size: 1.1rem;
        }

        /* Responsive - Enhanced */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.2rem;
            }

            section h2 {
                font-size: 2.2rem;
            }

            .projects-grid,
            .skills-grid {
                grid-template-columns: 1fr;
            }

            .timeline::before {
                display: none;
            }

            .timeline-item {
                margin-left: 0;
            }

            .timeline-item::before {
                display: none;
            }

            .cta-buttons {
                flex-direction: column;
                width: 100%;
            }

            .btn {
                width: 100%;
            }
        }

        /* Smooth Scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Selection Color */
        ::selection {
            background: var(--color-primary);
            color: white;
        }

        /* Print Styles */
        @media print {
            .btn, .cta-buttons {
                display: none;
            }
            
            .project-card, .timeline-item, .skill-category {
                break-inside: avoid;
                page-break-inside: avoid;
            }
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
        <div class="hero-content">
            <div class="container">
                <h1>${this.escapeHtml(data.personalInfo.name)}</h1>
                <p>${this.escapeHtml(data.personalInfo.title)}</p>
                ${data.personalInfo.location ? `<p style="font-size: 1.1rem; margin-top: -1rem; opacity: 0.9;">📍 ${this.escapeHtml(data.personalInfo.location)}</p>` : ''}
                <div class="cta-buttons">
                    <a href="#projects" class="btn btn-primary">View Projects</a>
                    <a href="#contact" class="btn btn-secondary">Contact Me</a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <div class="container">
            <h2>About Me</h2>
            <p class="section-subtitle">Get to know me better</p>
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
        <p style="margin-top: 0.5rem; opacity: 0.7;">Generated with AI Portfolio Generator</p>
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
            <h2>Skills & Expertise</h2>
            <p class="section-subtitle">Technologies and tools I work with</p>
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
            <h2>Featured Projects</h2>
            <p class="section-subtitle">A showcase of my best work</p>
            <div class="projects-grid">
                ${projects.map(project => `
                    <div class="project-card">
                        ${project.featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
                        ${project.image ? 
                            `<img src="${this.escapeHtml(project.image)}" alt="${this.escapeHtml(project.title)}" class="project-image">` : 
                            `<div class="project-image">${this.escapeHtml(project.title.charAt(0))}</div>`
                        }
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
                            ${project.link || project.github ? `
                                <div class="project-links">
                                    ${project.link ? `<a href="${this.escapeHtml(project.link)}" class="project-link" target="_blank">🔗 View Live</a>` : ''}
                                    ${project.github ? `<a href="${this.escapeHtml(project.github)}" class="project-link" target="_blank">💻 GitHub</a>` : ''}
                                </div>
                            ` : ''}
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
            <h2>Work Experience</h2>
            <p class="section-subtitle">My professional journey</p>
            <div class="timeline">
                ${experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${this.escapeHtml(exp.position)}</div>
                                <div class="timeline-subtitle">${this.escapeHtml(exp.company)}</div>
                            </div>
                            <div class="timeline-meta">
                                <span class="timeline-duration">${this.escapeHtml(exp.duration)}</span>
                                ${exp.location ? `<span class="timeline-location">📍 ${this.escapeHtml(exp.location)}</span>` : ''}
                            </div>
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
            <p class="section-subtitle">My academic background</p>
            <div class="timeline">
                ${education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${this.escapeHtml(edu.degree)}</div>
                                <div class="timeline-subtitle">${this.escapeHtml(edu.institution)}</div>
                                ${edu.field ? `<p style="color: var(--color-secondary); margin-top: 0.3rem;">📚 ${this.escapeHtml(edu.field)}</p>` : ''}
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
            <p class="section-subtitle">Let's connect and discuss opportunities</p>
            <div class="contact-grid">
                ${contact.methods.map(method => `
                    <div class="contact-item">
                        <div class="contact-icon">${method.type === 'email' ? '📧' : method.type === 'phone' ? '📱' : '🌐'}</div>
                        <div class="contact-label">${this.escapeHtml(method.type)}</div>
                        <div class="contact-value">
                            ${method.link ? `<a href="${this.escapeHtml(method.link)}" style="color: inherit; text-decoration: none;">${this.escapeHtml(method.value)}</a>` : this.escapeHtml(method.value)}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${Object.keys(socialLinks).length > 0 ? `
                <div class="social-links">
                    ${Object.entries(socialLinks).map(([platform, data]) => {
                        const icons = {
                            github: '💻',
                            linkedin: '💼',
                            twitter: '🐦',
                            instagram: '📷',
                            youtube: '📹',
                            website: '🌐'
                        };
                        return `<a href="${this.escapeHtml(data.url)}" class="social-link" target="_blank" rel="noopener noreferrer" title="${platform}">
                            ${icons[platform] || platform[0].toUpperCase()}
                        </a>`;
                    }).join('')}
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
