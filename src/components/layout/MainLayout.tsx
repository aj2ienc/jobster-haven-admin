
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Briefcase, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MainLayout: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-jobs-blue flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span>JobHub</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"} 
              asChild
              className={cn(
                "gap-2",
                location.pathname === "/" ? "bg-jobs-blue hover:bg-jobs-blue/90" : ""
              )}
            >
              <Link to="/">
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
            </Button>
            
            <Button 
              variant={location.pathname.startsWith("/admin") ? "default" : "ghost"} 
              asChild
              className={cn(
                "gap-2",
                location.pathname.startsWith("/admin") ? "bg-jobs-blue hover:bg-jobs-blue/90" : ""
              )}
            >
              <Link to="/admin">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-jobs-navy text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>JobHub</span>
              </Link>
              <p className="text-sm text-gray-300 mt-1">Find your dream job today</p>
            </div>
            
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} JobHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
