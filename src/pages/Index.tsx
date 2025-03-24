import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIExplainer from '@/components/AIExplainer';
import { destinations } from '@/services/AIRecommendationService';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = () => {
  const [featuredDestinations] = useState(destinations.slice(0, 3));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 px-6" 
        initial="initial" 
        animate="animate" 
        exit="exit" 
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto text-center">
            <motion.div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="animate-pulse mr-2">●</span>
              AI-Powered Travel Itinerary
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight"
              variants={fadeIn}
            >
              Discover your perfect Trip with{' '}
              <span className="text-primary">AI guidance</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Experience travel planning reimagined. Our AI understands your preferences
              and creates personalized itineraries that adapt to your feedback.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button asChild size="lg" className="h-12 px-6">
                <Link to="/discover">
                  Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <Link to="/preferences">
                  Set Your Preferences
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 relative"
            variants={fadeIn}
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10 rounded-full opacity-70" />
            
            <motion.div className="rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
                  alt="Travel planning with AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <div className="flex items-center mb-2">
                    <div className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-sm font-medium">
                      AI-Generated Itinerary
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                    Your Next Adventure Awaits
                  </h3>
                  <p className="text-white/80 max-w-lg">
                    Let our AI create a personalized travel plan based on your interests, pace, and style.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Destinations */}
      <motion.section 
        className="py-16 px-6 bg-secondary/50"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
            variants={fadeIn}
          >
            <div>
              <div className="text-sm font-medium text-primary mb-2">Trending Now</div>
              <h2 className="text-3xl font-semibold">Featured Destinations</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Discover popular destinations that match travelers with similar preferences to yours.
              </p>
            </div>
            
            <Button asChild variant="link" className="mt-4 md:mt-0 pl-0 md:pl-4">
              <Link to="/discover">
                View all destinations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="group relative overflow-hidden rounded-xl bg-card shadow-subtle card-hover"
                variants={fadeIn}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {destination.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="inline-block px-2 py-0.5 text-xs bg-black/30 backdrop-blur-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                  
                  <div className="flex items-center text-sm text-white/80 mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{destination.location}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                  
                  <Button 
                    asChild 
                    size="sm" 
                    className="mt-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Link to={`/discover?destination=${destination.id}`}>
                      Explore Destination
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* How It Works */}
      <motion.section 
        className="py-16 px-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-semibold mb-4">How TripTune Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform simplifies travel planning by understanding what matters most to you.
            </p>
          </motion.div>
          
          <AIExplainer />
        </div>
      </motion.section>
      
      {/* CTA */}
      <motion.section 
        className="py-16 px-6 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to plan your next adventure?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start by setting your travel preferences, and our AI will suggest destinations and
            itineraries tailored to your interests.
          </p>
          
          <Button asChild size="lg" className="h-12 px-6">
            <Link to="/discover">
              Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
