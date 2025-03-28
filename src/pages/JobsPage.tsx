
import React from "react";
import { useJobs } from "@/context/JobContext";
import JobCard from "@/components/job/JobCard";
import JobFilter from "@/components/job/JobFilter";
import { Skeleton } from "@/components/ui/skeleton";

const JobsPage: React.FC = () => {
  const { filteredJobs, loading, setFilter } = useJobs();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jobs-navy mb-2">Find Your Dream Job</h1>
        <p className="text-jobs-gray">Browse through our curated selection of job opportunities</p>
      </div>

      <JobFilter onFilterChange={setFilter} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No jobs found</h3>
          <p className="text-jobs-gray">
            Try adjusting your search filters or check back later for new opportunities
          </p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
