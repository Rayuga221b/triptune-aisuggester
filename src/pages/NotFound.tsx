
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinOff, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-1 flex items-center justify-center p-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
      >
        <div className="max-w-md w-full text-center glass rounded-xl p-8 shadow-subtle">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            <MapPinOff className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl font-semibold mb-3">Page Not Found</h1>
          
          <p className="text-muted-foreground mb-6">
            The destination you're looking for doesn't exist or has been moved.
            Let's get you back on the right path.
          </p>
          
          <Button asChild size="lg" className="px-6">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
