
import React, { createContext, useContext, useState, useEffect } from "react";
import { Job, JobFilter } from "@/types/job";
import { jobs as initialJobs } from "@/data/jobs";
import { useToast } from "@/hooks/use-toast";

interface JobContextProps {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  filter: JobFilter;
  setFilter: (filter: JobFilter) => void;
  getJob: (id: string) => Job | undefined;
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<JobFilter>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize jobs from mock data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setJobs(initialJobs);
      setFilteredJobs(initialJobs);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    if (jobs.length === 0) return;

    let result = [...jobs];

    if (filter.searchTerm) {
      const searchTermLower = filter.searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTermLower) ||
          job.company.toLowerCase().includes(searchTermLower) ||
          job.description.toLowerCase().includes(searchTermLower)
      );
    }

    if (filter.location) {
      const locationLower = filter.location.toLowerCase();
      result = result.filter(
        (job) =>
          job.location.city.toLowerCase().includes(locationLower) ||
          (job.location.state?.toLowerCase().includes(locationLower) || false) ||
          job.location.country.toLowerCase().includes(locationLower)
      );
    }

    if (filter.remote) {
      result = result.filter((job) => job.location.remote);
    }

    if (filter.type) {
      result = result.filter((job) => job.type === filter.type);
    }

    setFilteredJobs(result);
  }, [filter, jobs]);

  const getJob = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const addJob = (job: Job) => {
    const newJob = {
      ...job,
      id: job.id || Date.now().toString(),
      postedAt: job.postedAt || new Date().toISOString(),
    };
    
    setJobs((prevJobs) => [newJob, ...prevJobs]);
    
    toast({
      title: "Job Created",
      description: `${job.title} at ${job.company} has been created.`,
    });
  };

  const updateJob = (job: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) => (j.id === job.id ? job : j))
    );
    
    toast({
      title: "Job Updated",
      description: `${job.title} at ${job.company} has been updated.`,
    });
  };

  const deleteJob = (id: string) => {
    const jobToDelete = jobs.find(job => job.id === id);
    
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    
    if (jobToDelete) {
      toast({
        title: "Job Deleted",
        description: `${jobToDelete.title} at ${jobToDelete.company} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        loading,
        filter,
        setFilter,
        getJob,
        addJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
