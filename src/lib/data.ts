// Edit this file to update portfolio content without touching presentation code.

export const personal = {
  name: 'Raja Siddharth M',
  firstName: 'Raja',
  initials: 'RS',
  role: 'Full-stack Developer',
  roleAlternates: ['Full-stack Developer', 'Frontend Engineer', 'Problem Solver'],
  location: 'Coimbatore, Tamil Nadu, India',
  bio: 'I design and build thoughtful web experiences with a focus on clean interfaces, useful interactions, and dependable code.',
  bioLong: [
    'I am a Computer Science and Engineering student and an independent developer who enjoys turning an idea into a clear, responsive product.',
    'My work spans modern JavaScript interfaces, practical web tools, and the details that make a site feel considered: performance, accessibility, and an interface people can understand at a glance.',
  ],
  avatar: '/raja-siddharth.jpg',
  resumeUrl: '/resume',
  openToWork: true,
} as const

export const social = {
  github: 'https://github.com/raja2006-jpg',
  // Add your profile URL when ready. The UI intentionally hides this until then.
  linkedin: '',
  // Add a real address before launch. Keeping this blank prevents a misleading mail link.
  email: '',
} as const

export const stats = [
  { label: 'Public repositories', value: '25+', detail: 'Ideas and builds in progress' },
  { label: 'Live projects', value: '6+', detail: 'Deployed experiments and products' },
  { label: 'Focus', value: 'CSE', detail: 'Computer Science & Engineering' },
] as const

export const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'HTML', 'CSS', 'Tailwind CSS', 'Git & GitHub', 'REST APIs', 'Responsive UI',
] as const

export const skillGroups = [
  { label: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend & data', items: ['Node.js', 'Python', 'REST APIs', 'Databases'] },
  { label: 'Workflow', items: ['Git & GitHub', 'Vercel', 'Figma', 'Performance basics'] },
] as const

export const projects = [
  {
    id: 'shalom',
    name: 'Shalom Systems',
    type: 'Business website',
    description: 'A deployed business-focused web experience built around clear hierarchy, responsive layouts, and direct calls to action.',
    tech: ['JavaScript','Express.js','MongoDB','Node', 'Vercel',],
    accent: 'violet',
    images: [
    '/projects/shalom-1.png',
    '/projects/shalom-2.png',
    '/projects/shalom-3.png',
    '/projects/shalom-4.png',
  ],
    liveUrl: 'https://shalomsystemsolutions.com/',
    githubUrl: 'https://github.com/raja2006-jpg/Shalom',
  },
  {
    id: 'netbox',
    name: 'NetBox',
    type: 'Web interface',
    description: 'A lightweight deployed interface that explores clean navigation, compact information blocks, and accessible responsive presentation.',
    tech: ['HTML', 'CSS', 'JavaScript','python', 'flask'],
    accent: 'cyan',
    images: [
    '/projects/netbox-1.png',
    '/projects/netbox-2.png',
    '/projects/netbox-3.png',
    '/projects/netbox-4.png',
  ],
    liveUrl: 'https://netbox-72tq.onrender.com/',
    githubUrl: 'https://github.com/raja2006-jpg/NetBox',
  },
  {
    id: 'social-blog',
    name: 'E-Commerce Website',
    type: 'Content platform',
    description: 'Developed a modern e-commerce website using Next.js with responsive design, optimized performance, and SEO-friendly architecture to enhance user experience and search engine visibility.',
    tech: ['TypeScript', 'Tailwind CSS', 'Next.js', 'Vercel'],
    accent: 'orange',
    images: [
    '/projects/social-blog-1.png',
    '/projects/social-blog-2.png',
    '/projects/social-blog-3.png',
    '/projects/social-blog-4.png',
  ],
    liveUrl: 'https://mskmarketing.vercel.app/',
    githubUrl: 'https://github.com/raja2006-jpg/social-blog-platform',
  },
  {
    id: 'cloud-vault',
    name: 'Cloud Vault',
    type: 'Cloud utility',
    description: 'A cloud-focused project that demonstrates Raja’s interest in practical tools, deployment, and Python-based development.',
    tech: ['Python', 'Web development', 'Vercel'],
    accent: 'pink',
    images: [
    '/projects/cloud-vault-1.png',
    '/projects/cloud-vault-2.png',
    '/projects/cloud-vault-3.png',
    '/projects/cloud-vault-4.png',
  ],
    liveUrl: 'https://cloud-valut.vercel.app',
    githubUrl: 'https://github.com/raja2006-jpg/cloud_valut',
  },
] as const

export const experience = [
  {
    period: '2026',
    title: 'MERN-STACK Developer',
    organisation: 'Personal & collaborative projects',
    description: 'Building and deploying web projects while strengthening product thinking, frontend implementation, and practical development workflows.',
    tags: ['JavaScript', 'React', 'Deployment'],
  },
  {
    period: 'Sept 2025  — Mar 2026',
    title: 'Web Development Intern',
    organisation: 'TECH VEDHU',
    description: 'Contributed to the development of a web application, focusing on frontend features, responsive design, and user experience enhancements.',
    tags: ['JavaScript', 'React', 'Frontend Development','API Integration',],
  },
] as const

export const education = [
  {
    period: '2023 — 2027',
    qualification: 'Bachelor of Engineering',
    subject: 'Computer Science & Engineering',
    institution: 'RVS Institute of Technology',
    location: 'Coimbatore, Tamil Nadu',
  },
] as const

export const services = [
  {
    number: '01',
    title: 'Frontend development',
    description: 'Responsive, accessible interfaces that feel fast and intentional across every screen size.',
  },
  {
    number: '02',
    title: 'Website experiences',
    description: 'From landing pages to multi-section sites, shaped around a clear message and confident visual system.',
  },
  {
    number: '03',
    title: 'UI refinement',
    description: 'Thoughtful polish for interaction, motion, hierarchy, and the small details users remember.',
  },
] as const

export const certifications = [
  {
    title: 'Learning in public',
    issuer: 'Certification archive',
    date: 'Updating',
    detail: 'Raja is currently curating verified certification records. This section is ready for badges and credential URLs.',
  },
] as const

export const seo = {
  title: 'Raja Siddharth M — Full-stack Developer',
  description: 'Portfolio of Raja Siddharth M, a Computer Science student and full-stack developer building thoughtful web experiences.',
  keywords: ['Raja Siddharth M', 'Raja Siddharth', 'Full-stack Developer', 'React developer', 'Web developer', 'Portfolio'],
  ogImage: '/opengraph-image',
  // Change this to your production domain before publishing.
  siteUrl: 'https://rajasiddharth.dev',
} as const
