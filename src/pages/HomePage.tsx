
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/context/JobContext";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setFilter } = useJobs();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({ searchTerm });
    navigate("/jobs");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gradient-to-r from-jobs-blue/90 to-jobs-navy py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities with top employers. Your next career move is just a search away.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jobs-gray" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="bg-jobs-blue hover:bg-jobs-blue/90 text-white px-8 h-12"
              >
                Search Jobs
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-jobs-navy mb-4">
            Why Choose JobHub?
          </h2>
          <p className="text-jobs-gray max-w-2xl mx-auto">
            We connect talented professionals with the best companies around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="bg-jobs-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-jobs-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-jobs-navy">Seamless Job Search</h3>
            <p className="text-jobs-gray">Find the perfect job with our powerful search and filtering tools.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="bg-jobs-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-jobs-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-jobs-navy">Top Employers</h3>
            <p className="text-jobs-gray">Connect with leading companies looking for talent like you.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="bg-jobs-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-jobs-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-jobs-navy">Easy Applications</h3>
            <p className="text-jobs-gray">Apply to jobs with just a few clicks and track your applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
