
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, MapPin, Calendar, ArrowLeft, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobApplication from "@/components/job/JobApplication";

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob } = useJobs();
  
  const job = getJob(id || "");
  
  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="text-jobs-gray mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")} variant="outline">
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6 gap-2 text-jobs-gray"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <Briefcase className="w-8 h-8 text-jobs-gray" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-jobs-navy">{job.title}</h1>
                  <p className="text-lg text-jobs-gray">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center text-jobs-gray">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {job.location.city}, {job.location.state || job.location.country}
                        {job.location.remote && " (Remote available)"}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-jobs-gray">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{job.type}</span>
                    </div>
                    
                    <div className="flex items-center text-jobs-gray">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {job.featured && (
                <Badge className="bg-jobs-blue hover:bg-jobs-blue/90">Featured</Badge>
              )}
            </div>
            
            {job.salary && (
              <div className="mt-4 flex items-center text-jobs-blue font-medium">
                <DollarSign className="w-5 h-5 mr-1" />
                <span>
                  {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          
          {/* Job Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
          </div>
          
          {/* Job Requirements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Application Form */}
        <div className="lg:col-span-1">
          <JobApplication job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
