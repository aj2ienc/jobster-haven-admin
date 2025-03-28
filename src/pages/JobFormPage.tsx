
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/admin/JobForm";
import AIJobGenerator from "@/components/admin/AIJobGenerator";
import { Job } from "@/types/job";

const JobFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, addJob, updateJob } = useJobs();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      const existingJob = getJob(id);
      if (existingJob) {
        setJob(existingJob);
      } else {
        navigate("/admin");
      }
    }
  }, [id, getJob, navigate]);

  const handleSubmit = (data: Job) => {
    if (isEditing) {
      updateJob(data);
    } else {
      addJob(data);
    }
    navigate("/admin");
  };

  const handleJobGenerated = (generatedJob: any) => {
    setJob(prevJob => ({
      ...prevJob,
      ...generatedJob,
      id: prevJob?.id || Date.now().toString(),
      postedAt: prevJob?.postedAt || new Date().toISOString(),
      featured: prevJob?.featured || false,
    }));
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6 p-0 gap-2 hover:bg-transparent hover:text-jobs-blue"
        onClick={() => navigate("/admin")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to dashboard</span>
      </Button>

      {!isEditing && (
        <AIJobGenerator onJobGenerated={handleJobGenerated} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Job" : "Create New Job"}</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm job={job} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobFormPage;
