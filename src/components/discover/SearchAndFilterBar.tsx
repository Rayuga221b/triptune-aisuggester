
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PreferenceSelector from '@/components/PreferenceSelector';

interface SearchAndFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  preferences: any[];
  onPreferenceToggle: (id: string) => void;
  onImportanceChange: (id: string, value: number) => void;
}

const SearchAndFilterBar = ({
  searchQuery,
  setSearchQuery,
  preferences,
  onPreferenceToggle,
  onImportanceChange
}: SearchAndFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search destinations..."
          className="pl-9 w-full sm:w-[260px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Travel Preferences</SheetTitle>
            <SheetDescription>
              Customize your preferences to get tailored destination recommendations.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <PreferenceSelector
              preferences={preferences}
              onPreferenceToggle={onPreferenceToggle}
              onImportanceChange={onImportanceChange}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchAndFilterBar;
