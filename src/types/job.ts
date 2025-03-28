
export type JobLocation = {
  city: string;
  state?: string;
  country: string;
  remote: boolean;
};

export type JobType = 
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export type Job = {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: JobLocation;
  type: JobType;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedAt: string;
  applicationUrl?: string;
  featured: boolean;
};

export type JobFilter = {
  searchTerm?: string;
  location?: string;
  remote?: boolean;
  type?: JobType;
};
