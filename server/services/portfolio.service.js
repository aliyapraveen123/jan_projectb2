/**
 * Portfolio Service
 * Handles portfolio generation and processing
 */
class PortfolioService {
  /**
   * Generate portfolio structure from user data
   * @param {Object} data - User portfolio data
   * @returns {Object} Formatted portfolio structure
   */
  generatePortfolio(data) {
    const {
      personalInfo,
      about,
      skills = [],
      projects = [],
      experience = [],
      education = [],
      socialLinks = {},
      theme = 'minimal',
      colorScheme = 'light'
    } = data;

    // Validate required fields - be lenient with empty values
    if (!personalInfo || !personalInfo.name || personalInfo.name.trim().length === 0) {
      throw new Error('Name is required in Personal Information');
    }

    if (!personalInfo.title || personalInfo.title.trim().length === 0) {
      throw new Error('Title/Job Position is required in Personal Information');
    }

    if (!personalInfo.email || personalInfo.email.trim().length === 0) {
      throw new Error('Email is required in Personal Information');
    }

    // Clean about text (remove extra quotes if present)
    const cleanAbout = about ? about.trim().replace(/^["']+|["']+$/g, '') : '';
    
    if (!cleanAbout || cleanAbout.length < 10) {
      throw new Error('About section is required and must be at least 10 characters');
    }

    // Generate portfolio structure
    const portfolio = {
      metadata: {
        generatedAt: new Date().toISOString(),
        theme,
        colorScheme,
        version: '1.0.0'
      },
      personalInfo: this.formatPersonalInfo(personalInfo),
      hero: this.generateHeroSection(personalInfo),
      about: this.formatAbout(cleanAbout),
      skills: this.formatSkills(skills),
      projects: this.formatProjects(projects),
      experience: this.formatExperience(experience),
      education: this.formatEducation(education),
      contact: this.generateContactSection(personalInfo, socialLinks),
      socialLinks: this.formatSocialLinks(socialLinks),
      seo: this.generateSEOMetadata(personalInfo, about)
    };

    // Debug: log formatted skills to help trace user-provided skills vs auto additions
    try {
      console.log('DEBUG: formatted skills =>', JSON.stringify(portfolio.skills, null, 2));
    } catch (e) {
      // ignore
    }

    return portfolio;
  }

  /**
   * Format personal information
   */
  formatPersonalInfo(info) {
    return {
      name: info.name.trim(),
      title: info.title.trim(),
      email: info.email.trim().toLowerCase(),
      phone: info.phone?.trim() || '',
      location: info.location?.trim() || '',
      website: info.website?.trim() || ''
    };
  }

  /**
   * Generate hero section
   */
  generateHeroSection(personalInfo) {
    return {
      name: personalInfo.name,
      title: personalInfo.title,
      tagline: `${personalInfo.title} | ${personalInfo.location || 'Available for opportunities'}`,
      cta: [
        { text: 'View Projects', link: '#projects' },
        { text: 'Contact Me', link: '#contact' }
      ]
    };
  }

  /**
   * Format about section
   */
  formatAbout(about) {
    return {
      content: about.trim(),
      wordCount: about.trim().split(/\s+/).length,
      readingTime: Math.ceil(about.trim().split(/\s+/).length / 200) // ~200 words per minute
    };
  }

  /**
   * Format skills with categories
   */
  formatSkills(skills) {
    if (!skills || skills.length === 0) return [];

    // Normalize input: accept strings ("HTML") or objects ({ name, level, category })
    const normalized = skills
      .map((s) => {
        if (typeof s === 'string') return { name: s.trim() };
        return {
          name: (s.name || '').toString().trim(),
          level: s.level,
          category: s.category
        };
      })
      .filter((s) => s.name && s.name.length > 0);

    // If user provided categories, group by those categories and preserve entries exactly
    const hasCategory = normalized.some((s) => s.category && s.category.toString().trim().length > 0);

    if (hasCategory) {
      const grouped = normalized.reduce((acc, skill) => {
        const category = (skill.category || 'Other').toString().trim();
        if (!acc[category]) acc[category] = [];
        acc[category].push({ name: skill.name, level: skill.level ?? 0 });
        return acc;
      }, {});

      return Object.entries(grouped).map(([category, items]) => ({ category, skills: items }));
    }

    // No categories provided — return a single "Skills" group preserving user entries (no auto-additions)
    return [
      {
        category: 'Skills',
        skills: normalized.map((s) => ({ name: s.name, level: s.level ?? 0 }))
      }
    ];
  }

  /**
   * Format projects
   */
  formatProjects(projects) {
    if (!projects || projects.length === 0) return [];

    return projects.map((project, index) => ({
      id: `project-${index + 1}`,
      title: project.title.trim(),
      description: project.description.trim(),
      technologies: project.technologies || [],
      link: project.link || '',
      github: project.github || '',
      image: project.image || this.getPlaceholderImage('project'),
      featured: project.featured || false,
      order: index
    }));
  }

  /**
   * Format experience
   */
  formatExperience(experience) {
    if (!experience || experience.length === 0) return [];

    return experience.map((exp, index) => ({
      id: `experience-${index + 1}`,
      company: exp.company.trim(),
      position: exp.position.trim(),
      duration: exp.duration.trim(),
      location: exp.location?.trim() || '',
      description: exp.description.trim(),
      highlights: this.extractHighlights(exp.description),
      order: index
    }));
  }

  /**
   * Format education
   */
  formatEducation(education) {
    if (!education || education.length === 0) return [];

    return education.map((edu, index) => ({
      id: `education-${index + 1}`,
      institution: edu.institution.trim(),
      degree: edu.degree.trim(),
      field: edu.field?.trim() || '',
      year: edu.year.trim(),
      description: edu.description?.trim() || '',
      order: index
    }));
  }

  /**
   * Generate contact section
   */
  generateContactSection(personalInfo, socialLinks) {
    const contactMethods = [];

    if (personalInfo.email) {
      contactMethods.push({
        type: 'email',
        value: personalInfo.email,
        link: `mailto:${personalInfo.email}`,
        icon: 'mail'
      });
    }

    if (personalInfo.phone) {
      contactMethods.push({
        type: 'phone',
        value: personalInfo.phone,
        link: `tel:${personalInfo.phone}`,
        icon: 'phone'
      });
    }

    if (personalInfo.location) {
      contactMethods.push({
        type: 'location',
        value: personalInfo.location,
        icon: 'map-pin'
      });
    }

    return {
      methods: contactMethods,
      social: socialLinks
    };
  }

  /**
   * Format social links
   */
  formatSocialLinks(links) {
    const formatted = {};
    const platforms = ['github', 'linkedin', 'twitter', 'instagram', 'youtube', 'website'];

    platforms.forEach(platform => {
      if (links[platform] && links[platform].trim()) {
        formatted[platform] = {
          url: links[platform].trim(),
          username: this.extractUsername(links[platform], platform)
        };
      }
    });

    return formatted;
  }

  /**
   * Extract username from social link
   */
  extractUsername(url, platform) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.replace(/^\/|\/$/g, '');
      return pathname.split('/')[0] || url;
    } catch {
      return url;
    }
  }

  /**
   * Extract bullet points/highlights from description
   */
  extractHighlights(description) {
    // Split by common bullet point markers or newlines
    const lines = description
      .split(/[\n•\-\*]/)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return lines.length > 1 ? lines : [description];
  }

  /**
   * Generate SEO metadata
   */
  generateSEOMetadata(personalInfo, about) {
    const description = about.length > 160 
      ? about.substring(0, 157) + '...'
      : about;

    return {
      title: `${personalInfo.name} - ${personalInfo.title}`,
      description,
      keywords: [
        personalInfo.name,
        personalInfo.title,
        'portfolio',
        'developer',
        'hire'
      ].join(', '),
      author: personalInfo.name,
      ogType: 'website'
    };
  }

  /**
   * Get placeholder image
   */
  getPlaceholderImage(type) {
    const placeholders = {
      project: 'https://via.placeholder.com/800x450/667eea/ffffff?text=Project+Image',
      profile: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Profile'
    };
    return placeholders[type] || placeholders.project;
  }

  /**
   * Validate portfolio completeness
   */
  validateCompleteness(portfolio) {
    const score = {
      total: 0,
      max: 100,
      suggestions: []
    };

    // Personal Info (20 points)
    if (portfolio.personalInfo.name && portfolio.personalInfo.title) {
      score.total += 20;
    }

    // About (15 points)
    if (portfolio.about.content && portfolio.about.wordCount >= 50) {
      score.total += 15;
    } else if (portfolio.about.content) {
      score.total += 7;
      score.suggestions.push('About section could be more detailed (recommended 50+ words)');
    }

    // Skills (15 points)
    if (portfolio.skills.length > 0) {
      score.total += 15;
    } else {
      score.suggestions.push('Add skills to showcase your expertise');
    }

    // Projects (20 points)
    if (portfolio.projects.length >= 3) {
      score.total += 20;
    } else if (portfolio.projects.length > 0) {
      score.total += 10;
      score.suggestions.push('Add more projects (recommended: 3+)');
    } else {
      score.suggestions.push('Add projects to demonstrate your work');
    }

    // Experience (15 points)
    if (portfolio.experience.length > 0) {
      score.total += 15;
    } else {
      score.suggestions.push('Add work experience');
    }

    // Education (10 points)
    if (portfolio.education.length > 0) {
      score.total += 10;
    } else {
      score.suggestions.push('Add education background');
    }

    // Contact/Social (5 points)
    if (Object.keys(portfolio.socialLinks).length > 0) {
      score.total += 5;
    } else {
      score.suggestions.push('Add social media links');
    }

    score.percentage = Math.round((score.total / score.max) * 100);
    score.rating = this.getCompletionRating(score.percentage);

    return score;
  }

  /**
   * Get completion rating
   */
  getCompletionRating(percentage) {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 50) return 'Fair';
    return 'Needs Improvement';
  }
}

// Export singleton instance
export default new PortfolioService();
