
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/admin/JobForm";
import AIJobGenerator from "@/components/admin/AIJobGenerator";
import { Job } from "@/types/job";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const JobFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, addJob, updateJob } = useJobs();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const isEditing = Boolean(id);

  // Create a form instance to share with both JobForm and AIJobGenerator
  const jobFormSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    company: z.string().min(2, { message: "Company name is required" }),
    logo: z.string().optional(),
    location: z.object({
      city: z.string(),
      state: z.string().optional(),
      country: z.string(),
      remote: z.boolean().default(false),
    }),
    type: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    requirements: z.array(z.string()),
    salary: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }).optional(),
    applicationUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: job ? {
      ...job,
      requirements: job.requirements || [""],
    } : {
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
