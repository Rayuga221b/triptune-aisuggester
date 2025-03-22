
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <MapPin className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-semibold">Journey<span className="text-primary">AI</span></span>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center mb-6 md:mb-0">
            <Link to="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/discover" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Discover
            </Link>
            <Link to="/itineraries" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Itineraries
            </Link>
            <Link to="/preferences" className="text-sm text-foreground/80 hover:text-primary transition-colors">
              Preferences
            </Link>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} JourneyAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
