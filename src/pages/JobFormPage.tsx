
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm, { jobFormSchema, JobFormValues } from "@/components/admin/JobForm";
import AIJobGenerator from "@/components/admin/AIJobGenerator";
import { Job } from "@/types/job";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const JobFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, addJob, updateJob } = useJobs();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const isEditing = Boolean(id);

  // Create a form instance to share with both JobForm and AIJobGenerator
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      logo: "",
      location: {
        city: "",
        state: "",
        country: "",
        remote: false,
      },
      type: "Full-time",
      description: "",
      requirements: [""],
      salary: {
        min: 0,
        max: 0,
        currency: "USD",
      },
      applicationUrl: "",
      featured: false,
    },
  });

  useEffect(() => {
    if (id) {
      const existingJob = getJob(id);
      if (existingJob) {
        setJob(existingJob);
        
        // Reset form with existing job data
        form.reset({
          ...existingJob,
          requirements: existingJob.requirements || [""],
        });
      } else {
        navigate("/admin");
      }
    }
  }, [id, getJob, navigate, form]);

  const handleSubmit = (data: JobFormValues) => {
    // Create job data with all required fields as non-optional
    const jobData: Job = {
      id: id || Date.now().toString(),
      title: data.title,
      company: data.company,
      logo: data.logo || "",
      location: {
        city: data.location.city,
        state: data.location.state || "",
        country: data.location.country,
        remote: data.location.remote || false,
      },
      type: data.type,
      description: data.description,
      requirements: data.requirements.filter(req => req.trim() !== "") || [],
      salary: data.salary,
      postedAt: job?.postedAt || new Date().toISOString(),
      applicationUrl: data.applicationUrl || "",
      featured: data.featured || false,
    };
    
    if (isEditing) {
      updateJob(jobData);
    } else {
      addJob(jobData);
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
        <AIJobGenerator 
          onJobGenerated={handleJobGenerated} 
          form={form}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Job" : "Create New Job"}</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm 
            job={job} 
            onSubmit={handleSubmit}
            form={form}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobFormPage;
