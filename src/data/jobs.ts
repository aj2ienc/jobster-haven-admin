
import { Job } from "@/types/job";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "/company-logos/techcorp.png",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      remote: true,
    },
    type: "Full-time",
    description: 
      "We are looking for a talented Frontend Developer to join our team. You will be responsible for building user interfaces with React and implementing responsive designs.",
    requirements: [
      "3+ years of experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with state management libraries",
      "Proficient in HTML/CSS",
      "Knowledge of responsive design principles"
    ],
    salary: {
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    postedAt: "2023-08-15T10:00:00Z",
    applicationUrl: "https://techcorp.com/careers",
    featured: true
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems",
    logo: "/company-logos/datasystems.png",
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
      remote: false,
    },
    type: "Full-time",
    description: 
      "Join our backend team to develop scalable and efficient APIs. You'll work on designing database schemas and implementing server-side logic.",
    requirements: [
      "5+ years of experience with Node.js",
      "Experience with databases (SQL and NoSQL)",
      "Knowledge of API design principles",
      "Understanding of cloud platforms (AWS, GCP)",
      "Experience with microservices architecture"
    ],
    salary: {
      min: 100000,
      max: 140000,
      currency: "USD"
    },
    postedAt: "2023-08-10T14:30:00Z",
    applicationUrl: "https://datasystems.com/join-us",
    featured: true
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    logo: "/company-logos/creativeminds.png",
    location: {
      city: "London",
      country: "UK",
      remote: true,
    },
    type: "Contract",
    description: 
      "We're seeking a creative UX/UI Designer to help us create beautiful and intuitive user experiences. You'll collaborate with our product and development teams to bring designs to life.",
    requirements: [
      "Portfolio demonstrating UX/UI skills",
      "Experience with Figma or similar tools",
      "Understanding of user-centered design principles",
      "Knowledge of design systems",
      "Ability to prototype interactions"
    ],
    salary: {
      min: 70000,
      max: 90000,
      currency: "GBP"
    },
    postedAt: "2023-08-05T09:15:00Z",
    applicationUrl: "https://creativeminds.io/careers",
    featured: false
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "AnalyticsPro",
    logo: "/company-logos/analyticspro.png",
    location: {
      city: "Boston",
      state: "MA",
      country: "USA",
      remote: false,
    },
    type: "Full-time",
    description: 
      "Join our data science team to extract insights from complex data sets. You'll develop machine learning models and contribute to our data-driven decision making.",
    requirements: [
      "Masters or PhD in Computer Science, Statistics, or related field",
      "Experience with Python and data science libraries",
      "Knowledge of machine learning algorithms",
      "Experience with big data technologies",
      "Strong analytical and problem-solving skills"
    ],
    salary: {
      min: 110000,
      max: 150000,
      currency: "USD"
    },
    postedAt: "2023-08-01T11:45:00Z",
    applicationUrl: "https://analyticspro.com/jobs",
    featured: false
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudScale",
    logo: "/company-logos/cloudscale.png",
    location: {
      city: "Seattle",
      state: "WA",
      country: "USA",
      remote: true,
    },
    type: "Full-time",
    description: 
      "We're looking for a DevOps Engineer to help us build and maintain our infrastructure. You'll work on CI/CD pipelines and ensure the reliability of our systems.",
    requirements: [
      "3+ years of DevOps experience",
      "Knowledge of cloud platforms (AWS, Azure, GCP)",
      "Experience with containerization and orchestration",
      "Familiarity with infrastructure as code",
      "Understanding of security best practices"
    ],
    salary: {
      min: 95000,
      max: 130000,
      currency: "USD"
    },
    postedAt: "2023-07-28T13:20:00Z",
    applicationUrl: "https://cloudscale.tech/careers",
    featured: true
  },
  {
    id: "6",
    title: "Product Manager",
    company: "InnovateTech",
    logo: "/company-logos/innovatetech.png",
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      remote: false,
    },
    type: "Full-time",
    description: 
      "Join our product team to help define and deliver innovative products. You'll work closely with design, engineering, and marketing teams.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management",
      "Understanding of agile methodologies",
      "Technical background preferred"
    ],
    salary: {
      min: 100000,
      max: 140000,
      currency: "USD"
    },
    postedAt: "2023-07-25T10:00:00Z",
    applicationUrl: "https://innovatetech.co/opportunities",
    featured: false
  },
  {
    id: "7",
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    logo: "/company-logos/appworks.png",
    location: {
      city: "Toronto",
      country: "Canada",
      remote: true,
    },
    type: "Full-time",
    description: 
      "We're seeking an experienced iOS developer to join our mobile team. You'll be responsible for developing and maintaining iOS applications.",
    requirements: [
      "3+ years of iOS development experience",
      "Proficiency in Swift and UIKit",
      "Understanding of iOS app architecture",
      "Experience with REST APIs and data persistence",
      "Knowledge of App Store submission process"
    ],
    salary: {
      min: 85000,
      max: 115000,
      currency: "CAD"
    },
    postedAt: "2023-07-20T09:30:00Z",
    applicationUrl: "https://appworks.dev/jobs",
    featured: false
  },
  {
    id: "8",
    title: "Full Stack Developer",
    company: "WebSolutions",
    logo: "/company-logos/websolutions.png",
    location: {
      city: "Berlin",
      country: "Germany",
      remote: true,
    },
    type: "Full-time",
    description: 
      "Join our team as a Full Stack Developer to work on end-to-end web applications. You'll be involved in both frontend and backend development.",
    requirements: [
      "Experience with JavaScript/TypeScript",
      "Knowledge of React or Angular",
      "Experience with Node.js",
      "Understanding of databases and API design",
      "Familiarity with cloud services"
    ],
    salary: {
      min: 60000,
      max: 80000,
      currency: "EUR"
    },
    postedAt: "2023-07-18T14:15:00Z",
    applicationUrl: "https://websolutions.de/careers",
    featured: true
  }
];
