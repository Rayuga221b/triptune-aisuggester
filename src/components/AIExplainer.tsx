
import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Lightbulb, Sparkles, CircleCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AIExplainerProps {
  className?: string;
}

const AIExplainer = ({ className }: AIExplainerProps) => {
  const features = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Personalized Suggestions',
      description: 'Our AI analyzes your preferences to suggest destinations that match your interests and travel style.'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Smart Adaptation',
      description: 'The more you interact, the better our suggestions become, learning from your selections and feedback.'
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Unique Experiences',
      description: 'Discover hidden gems and unique activities tailored to your preferences, not just the popular tourist spots.'
    },
    {
      icon: <CircleCheck className="h-6 w-6" />,
      title: 'Effortless Planning',
      description: 'Save time planning with AI-generated itineraries that consider your pace, interests, and travel constraints.'
    }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
          <Brain className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold mb-3">How Our AI Works For You</h2>
        <p className="text-muted-foreground">
          JourneyAI uses advanced machine learning to understand your travel preferences
          and create personalized itineraries that evolve as you provide feedback.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-subtle card-hover">
            <CardContent className="p-6">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="glass rounded-xl p-6 mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-8 -mt-8 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-medium mb-2">Your Privacy Matters</h3>
          <p className="text-sm text-foreground/80">
            We only use your preferences and feedback to improve your travel recommendations.
            Your data is processed securely and never shared with third parties without your consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIExplainer;
