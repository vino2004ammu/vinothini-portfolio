/**
 * =========================================================================
 * PORTFOLIO DATA CONFIGURATION
 * Edit your details, skills, projects, and contact info in this file.
 * All changes will automatically update across the entire website.
 * =========================================================================
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  featured: boolean;
  accuracyOrHighlight?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    role: string;
    challenges: string;
    outcome: string;
    architecture: string[];
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    percentage: number;
    level: 'Intermediate' | 'Advanced Beginner' | 'Proficient';
    stars: number;
    highlight?: string;
  }[];
}

export interface TimelineItem {
  period: string;
  type: 'Education' | 'Training' | 'Internship';
  title: string;
  institution: string;
  gradeOrBadge?: string;
  description: string;
  bullets: string[];
  technologies?: string[];
}

export const PORTFOLIO_CONFIG = {
  // Personal & Hero Info
  personal: {
    name: "VINOTHINI I",
    role: "Full Stack Python Developer",
    degree: "B.E. Computer Science & Engineering",
    profileImage: "/images/profile.svg", // Valid vector portrait asset in public/images/profile.svg
    location: "Kanyakumari, Tamil Nadu, India",
    phone: "+91 6369660513",
    email: "vino2004ammu@gmail.com",
    github: "https://github.com/vino2004ammu",
    githubUsername: "vino2004ammu",
    linkedin: "https://linkedin.com/in/vinothini-i",
    portfolioUrl: "https://vino2004ammu.github.io/My_Portfolio-/",
    status: "Open to Work",
    statusDetail: "Actively seeking Full Stack Python & Django Developer roles",
    shortBio: "Computer Science and Engineering graduate (8.49 CGPA) specializing in Full Stack Python Development. I design and engineer robust end-to-end web applications, secure Django backends, optimized SQL databases, and responsive user interfaces that deliver tangible business value.",
    aboutBio: [
      "I am a Computer Science and Engineering graduate from Anna University (graduated with 8.49 CGPA, First Class with Distinction) with dedicated hands-on training and specialization in Python Full Stack Development.",
      "My core passion lies in engineering resilient, clean, and maintainable web applications using Python, Django, FastAPI, relational SQL databases, and modern frontend technologies. I enjoy navigating every layer of the software development lifecycle—from conceptualizing system architecture and modeling normalized database schemas to building high-performance RESTful APIs and crafting responsive, intuitive user interfaces.",
      "During my software internships across Techvolt Software and Srishti Innovation, I gained practical exposure to UI/UX design principles and mobile application workflows. I also developed my capstone engineering project, an Advanced Marine Debris Detection system powered by hybrid deep learning.",
      "I combine rigorous technical discipline with an eager growth mindset. Grounded in solid object-oriented programming principles, algorithms, and clean code practices, I am actively seeking an opportunity as a junior Full Stack Python / Django Developer where I can contribute enthusiastically from day one while continually learning alongside experienced engineers."
    ],
    stats: [
      { value: "8.49", label: "Engineering CGPA", sublabel: "Anna University (2021-2025)" },
      { value: "02", label: "Featured Projects", sublabel: "Full-Stack Django & AI Platform" },
      { value: "02", label: "Software Internships", sublabel: "Techvolt & Srishti" },
      { value: "∞", label: "Learning Mindset", sublabel: "Continuous Growth & Adaptability" },
    ]
  },

  // What I Can Build Section
  whatICanBuild: [
    {
      number: "01",
      title: "Responsive Web Page",
      description: "Crafting pixel-perfect, mobile-friendly interfaces with semantic HTML5, CSS3, modern JavaScript, and fluid responsive layouts across all screen viewports.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsive Design"]
    },
    {
      number: "02",
      title: "Django Web Application",
      description: "Building robust web platforms utilizing Django's Model-View-Template architecture, class-based views, secure authentication, form validation, and admin panels.",
      techStack: ["Python", "Django", "ORM", "MVT Pattern", "SQLite / SQL"]
    },
    {
      number: "03",
      title: "REST API",
      description: "Designing structured JSON API endpoints using FastAPI and Python with clean serialization, error handling, and tested request pipelines.",
      techStack: ["FastAPI", "Python", "REST Architecture", "JSON", "Endpoints"]
    },
    {
      number: "04",
      title: "Python Automation",
      description: "Automating repetitive workflows, data extraction, CSV/Excel parsing, batch data processing, and scripting administrative tasks with modular Python scripts.",
      techStack: ["Python 3", "File I/O", "Data Parsing", "Automation Scripts"]
    }
  ],

  // Skill Categories with genuine, verified fresh graduate proficiencies
  skillCategories: [
    {
      title: "Backend Development",
      description: "Server-side architecture, class-based views, and web application routing.",
      skills: [
        { name: "Python", percentage: 85, level: "Proficient", stars: 5, highlight: "OOP, Class-based views, Clean modular code" },
        { name: "Django", percentage: 80, level: "Intermediate", stars: 4, highlight: "MVT, Authentication, Admin, Models" },
        { name: "FastAPI", percentage: 75, level: "Intermediate", stars: 4, highlight: "Async routes, REST endpoints, Pydantic" },
      ]
    },
    {
      title: "Frontend Development",
      description: "Semantic layouts, responsive styling, and client-side interactions.",
      skills: [
        { name: "HTML5", percentage: 90, level: "Proficient", stars: 5, highlight: "Semantic structure, Clean markup" },
        { name: "CSS3", percentage: 85, level: "Proficient", stars: 5, highlight: "Flexbox, Grid, Responsive layouts" },
        { name: "Bootstrap 5", percentage: 85, level: "Proficient", stars: 5, highlight: "Grid system, Responsive utilities" },
        { name: "JavaScript (ES6+)", percentage: 75, level: "Intermediate", stars: 4, highlight: "DOM events, Fetch API, Interactivity" },
      ]
    },
    {
      title: "Database Management",
      description: "Relational data structures, query writing, and table normalization.",
      skills: [
        { name: "SQL", percentage: 75, level: "Intermediate", stars: 4, highlight: "Queries, Joins, Aggregations, DDL & DML" },
        { name: "Oracle SQL", percentage: 75, level: "Intermediate", stars: 4, highlight: "Relational schemas, Queries, Data integrity" },
      ]
    },
    {
      title: "Currently Learning & Upskilling",
      description: "Actively expanding technical competencies with modern tools & frameworks.",
      skills: [
        { name: "React.js", percentage: 50, level: "Currently Learning", stars: 3, highlight: "Components, Hooks, Modern UI architecture" },
        { name: "Tailwind CSS", percentage: 55, level: "Currently Learning", stars: 3, highlight: "Utility-first rapid styling system" },
        { name: "REST APIs", percentage: 65, level: "Currently Learning", stars: 3, highlight: "Endpoints, JSON pipelines, API testing" },
      ]
    }
  ],

  // Real Projects Showcase
  projects: [
    {
      id: "local-service-booking-platform",
      number: "01",
      title: "Local Service Booking & Management Platform",
      tagline: "Full-Stack Django REST & React Platform with Role-Based Dashboards & Conflict-Free Booking",
      category: "Full Stack Web App",
      accuracyOrHighlight: "Django REST + React + PostgreSQL",
      description: "A full-stack service booking platform connecting customers with verified local service providers, featuring JWT authentication, conflict-free scheduling, and responsive role-based dashboards.",
      technologies: ["Python", "Django", "Django REST Framework", "React.js", "PostgreSQL", "Bootstrap"],
      githubUrl: "https://github.com/vino2004ammu/Local-Service-Booking-Platform",
      liveDemoUrl: "https://github.com/vino2004ammu/Local-Service-Booking-Platform",
      videoUrl: "/assets/aistudio/Screen_Recording_2026-11-06_195624_b5dba80b.mp4",
      featured: true,
      caseStudy: {
        overview: "Local home services frequently suffer from phone-tag scheduling, double-booking conflicts, and opaque pricing. This platform delivers a clean, unified digital marketplace connecting verified specialists with customers.",
        problem: "Traditional service hiring lacks transparent upfront rates, reliable real-time slot reservation, and tailored management consoles for customers, providers, and admins.",
        solution: "Architected a robust full-stack solution with Django REST Framework powering relational scheduling workflows in PostgreSQL, combined with responsive React.js dashboards and JWT-based role authentication.",
        features: [
          "Interactive service catalog with category filtering, provider reviews, and upfront pricing",
          "6-step guided booking workflow with automated double-booking prevention in PostgreSQL",
          "JWT-based role-based access control (RBAC) with tailored Customer, Provider, and Admin dashboards",
          "Real-time appointment tracking, simulated payment transactions, and cancellation handling"
        ],
        role: "Full Stack Developer — designed PostgreSQL database schemas, built Django REST Framework APIs, implemented booking conflict validations, and crafted the responsive React.js frontend interfaces.",
        challenges: "Preventing concurrent scheduling collisions for popular specialists. Solved by implementing atomic transaction checks and validation logic on slot availability.",
        outcome: "Engineered a production-ready, full-stack service marketplace supporting end-to-end customer bookings, provider dispatch consoles, and administrative platform oversight.",
        architecture: ["Django REST Framework API", "React.js Frontend", "PostgreSQL Relational Storage", "JWT Role-Based Auth", "Atomic Booking Engine"]
      }
    },
    {
      id: "marine-debris-detection",
      number: "02",
      title: "Advanced Marine Debris Detection System",
      tagline: "Hybrid Machine Learning & Computer Vision Platform for Ocean Conservation",
      category: "Machine Learning",
      accuracyOrHighlight: "Computer Vision & Deep Learning",
      description: "A computer vision and machine learning platform engineered to detect and classify ocean debris in coastal and marine environments using a hybrid Convolutional Neural Network (CNN) and Random Forest architecture.",
      technologies: ["Python", "CNN", "Random Forest", "Computer Vision", "Clarifai API", "Voila"],
      githubUrl: "https://github.com/vino2004ammu/Marine-Debris-Detection-System",
      liveDemoUrl: "https://github.com/vino2004ammu/Marine-Debris-Detection-System",
      featured: true,
      caseStudy: {
        overview: "Marine pollution is an escalating environmental crisis. Traditional manual monitoring methods are labor-intensive, hazardous, and difficult to scale across vast oceanic and coastal zones.",
        problem: "Automated optical detection in water bodies suffers from dynamic illumination changes, water refraction, floating vegetation, and variable debris geometry.",
        solution: "Engineered a hybrid computer vision pipeline combining deep Convolutional Neural Networks for hierarchical visual feature extraction with an ensemble Random Forest classifier to categorize debris types.",
        features: [
          "Hybrid CNN + Random Forest classification pipeline for ocean environmental monitoring",
          "Integration with the Clarifai API for enhanced visual recognition checkpoints",
          "Interactive Voila web interface allowing researchers to upload imagery for real-time analysis",
          "Automated detection metrics report generation with classification confidence breakdown"
        ],
        role: "Primary Developer — designed data preprocessing, trained and evaluated classification models, integrated Clarifai API, and created the interactive Voila frontend.",
        challenges: "Managing false positives caused by ocean foam and organic seaweed. Resolved by tuning convolutional filters and optimizing confidence thresholding in the Random Forest stage.",
        outcome: "Delivered a verifiable computer vision detection capstone project presented at Anna University.",
        architecture: ["Dataset Collection & Normalization", "CNN Feature Extractor", "Random Forest Classification Layer", "Clarifai API Grounding", "Voila Real-Time Interface"]
      }
    }
  ],

  // Education Timeline
  education: [
    {
      period: "2021 — 2025",
      type: "Education" as const,
      title: "B.E. Computer Science and Engineering",
      institution: "Anna University",
      gradeOrBadge: "CGPA: 8.49 / 10",
      description: "Completed undergraduate degree in Computer Science and Engineering with a focus on Software Engineering, Data Structures, Database Management Systems, and Object-Oriented Programming.",
      bullets: [
        "Maintained strong academic performance with an 8.49 CGPA throughout 4 years",
        "Completed capstone engineering project on Computer Vision Marine Debris Detection",
        "Active participant in technical symposiums, coding challenges, and software development workshops"
      ],
      technologies: ["Data Structures", "Algorithms", "DBMS", "Computer Networks", "OOP", "Software Engineering"]
    }
  ],

  // Certifications & Professional Training
  certifications: [
    {
      period: "Jan 2026 — Jul 2026",
      type: "Training" as const,
      title: "Python Full Stack Development",
      institution: "Pyspiders Python Training Institute",
      gradeOrBadge: "Comprehensive Program",
      description: "Rigorous full-stack training covering advanced Python programming, Django web framework, SQL database modeling, and frontend integration.",
      bullets: [
        "In-depth mastery of Python Core & Advanced concepts (OOP, decorators, generators, exceptions)",
        "Hands-on architectural implementation of Django MVT, ORM, authentication, and REST APIs",
        "Extensive practical query writing and normalization in MySQL and SQLite databases"
      ],
      technologies: ["Python", "Django", "SQL", "HTML5", "CSS3", "JavaScript", "REST APIs"]
    },
    {
      period: "Jun 2025 — Jul 2025",
      type: "Training" as const,
      title: "Full Stack Web Development Training",
      institution: "NoviTech R&D Private Limited",
      gradeOrBadge: "Professional Certification",
      description: "Specialized training focused on responsive frontend development, backend system integration, and production web deployment.",
      bullets: [
        "Engineered responsive user interfaces utilizing modern HTML5, CSS3, and JavaScript",
        "Built and tested full-stack prototypes with real-time DOM updates and form handling",
        "Collaborated on code reviews, Git branching strategies, and project documentation"
      ],
      technologies: ["Web Development", "Frontend Integration", "Responsive Design", "Git"]
    }
  ],

  // Internships Experience (Truthful & Accurate to Resume)
  internships: [
    {
      period: "Jul 2024",
      type: "Internship" as const,
      title: "UI/UX Design Intern",
      institution: "Techvolt Software Pvt. Ltd.",
      gradeOrBadge: "Internship",
      description: "Learned the basics of UI/UX design and created clean, user-friendly layouts for web pages.",
      bullets: [
        "Created simple wireframes and UI designs using Figma for web projects",
        "Designed responsive web page layouts focusing on clean layout and good readability",
        "Learned core design principles, color combinations, and user-friendly interface structure"
      ],
      technologies: ["UI/UX Design", "Figma", "Wireframing", "Web Layouts", "Responsive Design"]
    },
    {
      period: "Jun 2023 — Jul 2023",
      type: "Internship" as const,
      title: "Android App Development Intern",
      institution: "Srishti Innovation Computer System",
      gradeOrBadge: "Internship",
      description: "Gained hands-on experience in fundamental Android mobile app development and UI design using Java and XML.",
      bullets: [
        "Designed basic mobile app screens and layouts using XML",
        "Learned Android fundamentals including Activity lifecycle, buttons, and user inputs",
        "Tested mobile application screens and helped fix layout issues on Android emulators"
      ],
      technologies: ["Android Basics", "Java", "XML Layouts", "Mobile UI", "Testing"]
    }
  ]
};
