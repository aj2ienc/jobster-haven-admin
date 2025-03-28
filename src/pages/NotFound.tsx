
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
      <Briefcase className="w-16 h-16 text-jobs-blue mb-4" />
      
      <h1 className="text-4xl font-bold text-jobs-navy mb-2">404</h1>
      <p className="text-xl text-jobs-gray mb-8">
        Oops! We couldn't find the page you're looking for.
      </p>
      
      <div className="flex gap-4">
        <Button asChild className="bg-jobs-blue hover:bg-jobs-blue/90">
          <Link to="/">Browse Jobs</Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/admin">Go to Admin</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
