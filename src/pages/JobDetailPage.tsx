
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Briefcase, Clock, ExternalLink } from "lucide-react";

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, loading } = useJobs();
  
  const job = id ? getJob(id) : undefined;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-28" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Job not found</h2>
        <p className="text-gray-600 mb-6">
          The job you're looking for might have been removed or doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="bg-jobs-blue hover:bg-jobs-blue/90">
          Browse All Jobs
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6 p-0 gap-2 hover:bg-transparent hover:text-jobs-blue"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to all jobs</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <Briefcase className="h-8 w-8 text-jobs-gray" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {job.company}
                    </CardDescription>
                  </div>
                </div>
                
                {job.featured && (
                  <Badge className="bg-jobs-blue hover:bg-jobs-blue/90">Featured</Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-jobs-gray text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {job.location.city}, {job.location.state || job.location.country}
                    {job.location.remote && " (Remote available)"}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              {job.salary && (
                <div className="text-jobs-blue font-bold text-lg">
                  {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </div>
              )}
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Job Description</h3>
                <div className="text-jobs-gray whitespace-pre-line">
                  {job.description}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-jobs-gray">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            
            <CardFooter>
              {job.applicationUrl ? (
                <Button 
                  asChild 
                  className="bg-jobs-blue hover:bg-jobs-blue/90 gap-2"
                >
                  <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <p className="text-jobs-gray">No application link provided</p>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-jobs-gray">Company</h3>
                <p>{job.company}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-jobs-gray">Job Type</h3>
                <p>{job.type}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-jobs-gray">Location</h3>
                <p>
                  {job.location.city}, {job.location.state || job.location.country}
                  {job.location.remote && " (Remote available)"}
                </p>
              </div>
              
              {job.salary && (
                <div>
                  <h3 className="font-medium text-sm text-jobs-gray">Salary Range</h3>
                  <p>
                    {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                  </p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-sm text-jobs-gray">Posted Date</h3>
                <p>{format(new Date(job.postedAt), "MMMM d, yyyy")}</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              
              {job.applicationUrl && (
                <Button 
                  asChild
                  className="bg-jobs-blue hover:bg-jobs-blue/90"
                >
                  <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
