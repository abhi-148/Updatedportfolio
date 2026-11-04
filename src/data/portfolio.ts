
export const P = {
  name: 'Abhishek Kumar',
  brand: 'TechAbhi',

  links: {
    portfolio: 'https://my-perosnal-portfolio.vercel.app/',
    github: 'https://github.com/abhi-148',
    linkedin: 'https://www.linkedin.com/in/abhishek-pandey-25b756260/',
    email: 'abhipandeypandey646@gmail.com',
    phone: '+91 8400221056',
    tel: 'tel:+918400221056',
  },
}

// ----------------------------------------
// NAVIGATION
// ----------------------------------------

export const nav = [
  'about',
  'skills',
  'experience',
  'projects',
  'achievements',
  'resume',
  'contact',
]

// ----------------------------------------
// TECHNICAL SKILLS
// ----------------------------------------

export const skills: Record<
  string,
  { n: string; i: string }[]
> = {
  Frontend: [
    { n: 'React.js', i: 'react' },
    { n: 'Redux', i: 'redux' },
    { n: 'JavaScript', i: 'js' },
    { n: 'HTML5', i: 'html' },
    { n: 'CSS3', i: 'css' },
    { n: 'Tailwind CSS', i: 'tailwind' },
    { n: 'Bootstrap', i: 'bootstrap' },
  ],

  Backend: [
    { n: 'Node.js', i: 'node' },
    { n: 'Express.js', i: 'express' },
    { n: 'RESTful APIs', i: 'postman' },
    { n: 'JWT Authentication', i: 'jwt' },
  ],

  Database: [
    { n: 'MongoDB', i: 'mongo' },
    { n: 'MySQL', i: 'mysql' },
    { n: 'Redis', i: 'redis' },
  ],

  Languages: [
    { n: 'JavaScript (ES6+)', i: 'js' },
    { n: 'C++', i: 'cpp' },
    { n: 'SQL', i: 'sql' },
  ],

  'Tools & DevOps': [
    { n: 'Git', i: 'git' },
    { n: 'GitHub', i: 'github' },
    { n: 'Docker', i: 'docker' },
    { n: 'GitHub Actions', i: 'actions' },
    { n: 'Postman', i: 'postman' },
    { n: 'VS Code', i: 'vscode' },
  ],

  'AI & Productivity': [
    { n: 'ChatGPT', i: 'chatgpt' },
    { n: 'Claude AI', i: 'claude' },
    { n: 'GitHub Copilot', i: 'copilot' },
    { n: 'Prompt Engineering', i: 'prompt' },
    { n: 'AI-Assisted Coding', i: 'ai' },
    { n: 'AI-Based Debugging', i: 'debug' },
  ],

  'Core Concepts': [
    { n: 'OOP', i: 'oop' },
    { n: 'Data Structures & Algorithms', i: 'dsa' },
    { n: 'MVC Architecture', i: 'mvc' },
    { n: 'CRUD Operations', i: 'crud' },
    { n: 'Authentication', i: 'auth' },
    { n: 'RBAC', i: 'rbac' },
    { n: 'Responsive Design', i: 'responsive' },
  ],
}

// ----------------------------------------
// PROFESSIONAL EXPERIENCE
// ----------------------------------------

export const experience = [
  {
    org: 'Excelsior Technologies',
    role: 'MERN Stack Developer (Full-Time)',
    when: 'Feb 2026 – Present',
    mode: 'On-site',

    pts: [
      'Develop and maintain full-stack web applications using React.js, Node.js, Express.js and database technologies.',
      'Build and integrate RESTful APIs for frontend-backend communication and application workflows.',
      'Implement authentication, CRUD operations, responsive interfaces and database-driven functionality.',
      'Debug application issues and maintain code using Git and GitHub.',
    ],
  },

  {
    org: 'Warals Technology Pvt. Ltd.',
    role: 'React.js Intern',
    when: 'Nov 2025 – Jan 2026',
    mode: 'Remote',

    pts: [
      'Developed reusable React.js components and responsive interfaces using JavaScript, HTML5, CSS3 and Bootstrap.',
      'Improved frontend component structure, UI consistency and application usability.',
    ],
  },

  {
    org: 'Sparks to Ideas',
    role: 'Web Designer Intern',
    when: 'Apr 2025 – Jun 2025',
    mode: 'Remote',

    pts: [
      'Developed responsive web pages using HTML5, CSS3, JavaScript and Bootstrap.',
    ],
  },
]

// ----------------------------------------
// PROJECTS
// ----------------------------------------

export const projects: {
  id: string
  title: string
  type: string
  status?: string
  desc: string
  pts: string[]
  ptsLabel: string
  stack: string[]
  mock: 'jobs' | 'dash' | 'erp'
  live?: string
  repo?: string
}[] = [

  // PROJECT 01
  {
    id: '01',

    title: 'TechAbhi – Personal Job Portal',

    type: 'Personal Project',

    status: 'In Development',

    mock: 'jobs',

    desc:
      'A personal job portal under the TechAbhi brand designed to help job seekers explore and discover relevant opportunities.',

    ptsLabel: 'Project Scope',

    pts: [
      'Job listings and discovery interface',
      'Company details and job roles',
      'Location and eligibility information',
      'Job application links',
      'Responsive job discovery experience',
    ],

    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MySQL',
    ],
  },

  // PROJECT 02
  {
    id: '02',

    title: 'BacklinkPro – SEO Backlinks Campaign Management System',

    type: 'Company Project',

    mock: 'dash',

    desc:
      'An SEO campaign management platform with client registration, authentication, OTP verification and KYC workflows.',

    ptsLabel: 'Responsibilities & Contributions',

    pts: [
      'Client registration and authentication workflows',
      'OTP verification and KYC workflows',
      'Campaign and backlink management',
      'Keyword ranking dashboards',
      'CSV report generation',
      'Frontend-backend integration and API workflows',
    ],

    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MySQL',
      'REST APIs',
      'Git',
      'Postman',
    ],
  },

  // PROJECT 03
  {
    id: '03',

    title: 'School Management System (ERP)',

    type: 'Company Project',

    mock: 'erp',

    desc:
      'A school management application for student records, teacher information, attendance and academic administration.',

    ptsLabel: 'Responsibilities & Contributions',

    pts: [
      'Student and teacher record management',
      'Attendance management',
      'CRUD operations and RESTful APIs',
      'Structured database workflows',
      'Responsive administrative interfaces',
      'Improved application usability',
    ],

    stack: [
      'Node.js',
      'Express.js',
      'MySQL',
      'REST APIs',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
  },
]

// ----------------------------------------
// HACKATHONS & ACHIEVEMENTS
// ----------------------------------------

export const achievements = [
  {
    n: 30,
    pre: 'Top',
    title: 'Navonmesh 2.0 Hackathon',
    sub: 'Top 30 teams',
  },

  {
    n: 15,
    pre: 'Top',
    title: 'August Code Hackathon',
    sub: 'Top 15 teams',
  },

  {
    n: 0,
    pre: '',
    title: 'PU Code Hackathon 2.0',
    sub: 'National-level participant',
  },
]
