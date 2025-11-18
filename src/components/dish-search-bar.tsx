'use client';

import { autocompleteDishName } from '@/ai/flows/autocomplete-dish-name';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface DishSearchBarProps {
  onSearch: (term: string) => void;
}

export function DishSearchBar({ onSearch }: DishSearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const getSuggestions = useCallback(async (term: string) => {
    if (term.length < 2) {
      setSuggestions([]);
      setPopoverOpen(false);
      return;
    }
    setLoading(true);
    try {
      const result = await autocompleteDishName({ partialDishName: term });
      setSuggestions(result.suggestions);
      setPopoverOpen(result.suggestions.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setPopoverOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      getSuggestions(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, getSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '') {
      onSearch('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setPopoverOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
    setPopoverOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm món ăn (ví dụ: Phở, Bún chả...)"
              className="w-full pl-12 pr-28 h-14 text-base rounded-full shadow-lg border-2 border-transparent focus:border-primary"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() =>
                inputValue && suggestions.length > 0 && setPopoverOpen(true)
              }
            />
            <Button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 h-11 rounded-full px-8 font-bold"
            >
              Tìm kiếm
            </Button>
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {loading ? (
            <div className="space-y-2 p-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-2/3" />
            </div>
          ) : (
            <div className="flex flex-col">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-10"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </form>
  );
}
