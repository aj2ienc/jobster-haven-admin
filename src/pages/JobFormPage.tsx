
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm, { jobFormSchema, JobFormValues } from "@/components/admin/JobForm";
import { Job } from "@/types/job";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const JobFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, addJob, updateJob } = useJobs();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const isEditing = Boolean(id);
  const { toast } = useToast();
  const [jsonInput, setJsonInput] = useState("");

  // Create a form instance to share with JobForm
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
      salary: {
        min: data.salary.min,
        max: data.salary.max,
        currency: data.salary.currency,
      },
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

  const handleJsonApply = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      
      // Validate and populate the form with the JSON data
      form.reset({
        title: jsonData.title || "",
        company: jsonData.company || "",
        logo: jsonData.logo || "",
        location: {
          city: jsonData.location?.city || "",
          state: jsonData.location?.state || "",
          country: jsonData.location?.country || "",
          remote: jsonData.location?.remote || false,
        },
        type: jsonData.type || "Full-time",
        description: jsonData.description || "",
        requirements: jsonData.requirements?.length ? jsonData.requirements : [""],
        salary: {
          min: jsonData.salary?.min || 0,
          max: jsonData.salary?.max || 0,
          currency: jsonData.salary?.currency || "USD",
        },
        applicationUrl: jsonData.applicationUrl || "",
        featured: jsonData.featured || false,
      });
      
      toast({
        title: "JSON data applied",
        description: "Form has been populated with the provided JSON data.",
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please provide valid JSON data.",
        variant: "destructive",
      });
    }
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Import Job from JSON</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder='{"title": "Frontend Developer", "company": "TechCorp", ...}'
              className="min-h-32 font-mono text-sm"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <Button 
              onClick={handleJsonApply}
              className="bg-jobs-blue hover:bg-jobs-blue/90"
            >
              Apply JSON
            </Button>
          </CardContent>
        </Card>
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
