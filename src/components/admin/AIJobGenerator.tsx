
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIJobGeneratorProps {
  onJobGenerated: (jobData: any) => void;
}

const AIJobGenerator: React.FC<AIJobGeneratorProps> = ({ onJobGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateJob = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a job description to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // This is a mock implementation - in a real app you would call an AI API
      setTimeout(() => {
        // Mock response simulating an AI-generated job
        const mockResponse = parseJobDescription(prompt);
        onJobGenerated(mockResponse);
        
        toast({
          title: "Job generated",
          description: "Job details have been populated from your description",
        });
        
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate job description",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  // Parse job description from natural language
  const parseJobDescription = (text: string) => {
    // This is a simple mock implementation
    // In a real app, this would use a proper AI model
    const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
    
    // Extract job title - look for common patterns
    let title = "Software Developer"; // Default
    if (text.toLowerCase().includes("designer")) title = "UI/UX Designer";
    if (text.toLowerCase().includes("manager")) title = "Project Manager";
    if (text.toLowerCase().includes("engineer")) title = "Software Engineer";
    if (text.toLowerCase().includes("market")) title = "Marketing Specialist";
    
    // Extract job type
    let type = "Full-time"; // Default
    for (const jobType of jobTypes) {
      if (text.toLowerCase().includes(jobType.toLowerCase())) {
        type = jobType;
        break;
      }
    }
    
    // Extract salary range
    let salaryMin = 50000;
    let salaryMax = 100000;
    const salaryMatches = text.match(/\$\d+k|\$\d+,\d+|\d+k|\d+,\d+/g);
    if (salaryMatches && salaryMatches.length >= 2) {
      // Convert first two matches to numbers
      const salaries = salaryMatches
        .slice(0, 2)
        .map(salary => {
          // Check if the salary string includes 'k' to multiply by 1000
          const multiplier = salary.includes('k') ? 1000 : 1;
          return parseInt(salary.replace(/\$|k|,/g, '')) * multiplier;
        });
      
      // Use as min/max if they're valid numbers
      if (!isNaN(salaries[0]) && !isNaN(salaries[1])) {
        salaryMin = Math.min(salaries[0], salaries[1]);
        salaryMax = Math.max(salaries[0], salaries[1]);
      }
    }
    
    // Extract requirements
    const requirements = [
      "Strong understanding of industry principles",
      "Excellent communication skills",
      "Problem-solving abilities",
      "Team collaboration"
    ];
    
    // Extract location
    let location = {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      remote: text.toLowerCase().includes("remote"),
    };
    
    return {
      title,
      company: "TechCorp",
      type,
      location,
      description: text,
      requirements,
      salary: {
        min: salaryMin,
        max: salaryMax,
        currency: "USD"
      },
    };
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">AI Job Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter a job description and our AI will generate the job details... (e.g. 'Looking for a full-time senior software engineer in San Francisco with React experience. Salary range $120k-$150k.')"
            className="min-h-24"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button 
            onClick={generateJob} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate Job Details</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIJobGenerator;
