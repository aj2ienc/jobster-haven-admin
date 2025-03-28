
import React, { useState } from "react";
import { JobFilter as JobFilterType, JobType } from "@/types/job";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface JobFilterProps {
  onFilterChange: (filter: JobFilterType) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [type, setType] = useState<JobType | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filter: JobFilterType = {};
    
    if (searchTerm) filter.searchTerm = searchTerm;
    if (location) filter.location = location;
    if (remote) filter.remote = remote;
    if (type) filter.type = type as JobType;
    
    onFilterChange(filter);
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocation("");
    setRemote(false);
    setType("");
    onFilterChange({});
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="hidden md:flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jobs-gray" />
            <Input
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jobs-gray" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex-1">
            <Select value={type} onValueChange={(value) => setType(value as JobType)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <Checkbox
              id="remote"
              checked={remote}
              onCheckedChange={(checked) => setRemote(checked as boolean)}
            />
            <Label htmlFor="remote">Remote Only</Label>
          </div>
          
          <Button type="submit" className="bg-jobs-blue hover:bg-jobs-blue/90">
            Search
          </Button>
          
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
        
        {/* Mobile Filter */}
        <div className="md:hidden space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jobs-gray" />
            <Input
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1 gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jobs-gray" />
                      <Input
                        id="mobile-location"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile-type">Job Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value as JobType)}>
                      <SelectTrigger id="mobile-type">
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="mobile-remote"
                      checked={remote}
                      onCheckedChange={(checked) => setRemote(checked as boolean)}
                    />
                    <Label htmlFor="mobile-remote">Remote Only</Label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button type="submit" className="flex-1 bg-jobs-blue hover:bg-jobs-blue/90">
              Search
            </Button>
          </div>
          
          <Button type="button" variant="outline" onClick={handleReset} className="w-full">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobFilter;
