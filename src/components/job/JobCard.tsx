
import React from "react";
import { Link } from "react-router-dom";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow duration-200 border-2 hover:border-jobs-blue/20">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-jobs-gray" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg text-jobs-navy line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-jobs-gray">{job.company}</p>
              </div>
            </div>
            
            {job.featured && (
              <Badge className="bg-jobs-blue hover:bg-jobs-blue/90">Featured</Badge>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-jobs-gray text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {job.location.city}, {job.location.state || job.location.country}
                {job.location.remote && " (Remote available)"}
              </span>
            </div>
            
            <div className="flex items-center text-jobs-gray text-sm">
              <Briefcase className="w-4 h-4 mr-1" />
              <span>{job.type}</span>
            </div>

            <div className="flex items-center text-jobs-gray text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          {job.salary ? (
            <p className="text-jobs-blue font-medium">
              {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
            </p>
          ) : (
            <p className="text-jobs-gray">Salary not specified</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
