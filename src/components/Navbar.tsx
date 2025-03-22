
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Itineraries', path: '/itineraries' },
    { name: 'Preferences', path: '/preferences' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300',
        isScrolled ? 'py-4 glass shadow-subtle' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-foreground"
        >
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Journey<span className="text-primary">AI</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors relative group',
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-foreground/80 hover:text-foreground'
              )}
            >
              {link.name}
              <span 
                className={cn(
                  'absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform duration-300',
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )}
              />
            </Link>
          ))}
        </div>
        
        {/* User Profile Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-icon">
            <User className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden btn-icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          'absolute top-full left-0 right-0 glass md:hidden px-6 py-4 space-y-4 transition-all duration-300',
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'block py-2 text-sm font-medium',
              location.pathname === link.path 
                ? 'text-primary' 
                : 'text-foreground/80 hover:text-foreground'
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="border-t border-border pt-4">
          <button className="flex items-center space-x-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
