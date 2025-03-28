import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Job, JobType } from "@/types/job";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Define the form schema type for better type safety
export const jobFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  logo: z.string().optional().default(""),
  location: z.object({
    city: z.string(),
    state: z.string().optional().default(""),
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
  }),
  applicationUrl: z.string().url().optional().default(""),
  featured: z.boolean().default(false),
});

// Define the type for the form data
export type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  job?: Job;
  onSubmit: (data: JobFormValues) => void;
  form: UseFormReturn<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit, form }) => {
  const { toast } = useToast();

  const handleFormSubmit = (data: JobFormValues) => {
    // Remove empty requirements
    data.requirements = data.requirements.filter(req => req.trim() !== "");
    
    onSubmit(data);
    
    toast({
      title: job ? "Job updated" : "Job created",
      description: `${data.title} at ${data.company} has been ${job ? "updated" : "created"}.`,
    });
  };

  const addRequirement = () => {
    const currentRequirements = form.watch("requirements");
    form.setValue("requirements", [...currentRequirements, ""]);
  };

  const removeRequirement = (index: number) => {
    const currentRequirements = form.watch("requirements");
    currentRequirements.splice(index, 1);
    form.setValue("requirements", [...currentRequirements]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. TechCorp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://company.com/logo.png" {...field} />
                </FormControl>
                <FormDescription>
                  URL to the company logo image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location.remote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Remote Available</FormLabel>
                  <FormDescription>
                    Can this job be done remotely?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary.min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 50000" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary.max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Salary</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 80000" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary.currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="applicationUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://company.com/apply" {...field} />
                </FormControl>
                <FormDescription>
                  URL where candidates can apply
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the role, responsibilities, and company culture..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Requirements</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRequirement}
            >
              Add Requirement
            </Button>
          </div>
          
          {form.watch("requirements").map((_, index) => (
            <div key={index} className="flex gap-2">
              <FormField
                control={form.control}
                name={`requirements.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="e.g. 3+ years experience with React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeRequirement(index)}
                disabled={form.watch("requirements").length <= 1}
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured Job</FormLabel>
                <FormDescription>
                  Featured jobs are displayed prominently on the jobs page
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-jobs-blue hover:bg-jobs-blue/90">
          {job ? "Update Job" : "Create Job"}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
