'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Dish, Flavor, Ingredient, IngredientCategory } from '@/lib/types';
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';

interface FilterControlsProps {
  flavors: Flavor[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  selectedFlavorIds: Set<number>;
  selectedIngredientIds: Set<number>;
  selectedType: Dish['type'] | 'all';
  onFlavorChange: (flavorId: number, isSelected: boolean) => void;
  onIngredientChange: (ingredientId: number, isSelected: boolean) => void;
  onTypeChange: (type: Dish['type'] | 'all') => void;
  onResetFilters: () => void;
}

export function FilterControls({
  flavors,
  ingredients,
  ingredientCategories,
  selectedFlavorIds,
  selectedIngredientIds,
  selectedType,
  onFlavorChange,
  onIngredientChange,
  onTypeChange,
  onResetFilters,
}: FilterControlsProps) {
  const [ingredientSearch, setIngredientSearch] = useState('');

  const filteredIngredients = useMemo(() => {
    if (!ingredientSearch) return [];
    return ingredients.filter(
      (ing) =>
        ing.name.toLowerCase().includes(ingredientSearch.toLowerCase()) &&
        !selectedIngredientIds.has(ing.id)
    );
  }, [ingredientSearch, ingredients, selectedIngredientIds]);

  const handleIngredientSearchAdd = (ingredientId: number) => {
    onIngredientChange(ingredientId, true);
    setIngredientSearch('');
  };

  return (
    <div className="p-6 bg-card rounded-xl shadow-md border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-headline font-semibold">Bộ lọc</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-2" />
          Xóa lọc
        </Button>
      </div>

      <div className='mb-4'>
        <h4 className="font-semibold text-sm mb-3 text-muted-foreground">
          Loại món ăn
        </h4>
        <RadioGroup
          value={selectedType}
          onValueChange={(value) => onTypeChange(value as Dish['type'] | 'all')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all" className="font-normal cursor-pointer">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Nấu tại nhà" id="type-recipe" />
            <Label htmlFor="type-recipe" className="font-normal cursor-pointer">Công thức</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Quán ăn" id="type-restaurant" />
            <Label htmlFor="type-restaurant" className="font-normal cursor-pointer">Quán ăn</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className='mb-4' />

      <Tabs defaultValue="flavor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flavor">Hương vị</TabsTrigger>
          <TabsTrigger value="ingredient">Nguyên liệu</TabsTrigger>
        </TabsList>
        <TabsContent value="flavor" className="mt-4">
          <ScrollArea className="h-80 pr-3">
            <div className="space-y-2 p-1">
              {flavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`flavor-${flavor.id}`}
                    checked={selectedFlavorIds.has(flavor.id)}
                    onCheckedChange={(checked) =>
                      onFlavorChange(flavor.id, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`flavor-${flavor.id}`}
                    className="font-normal cursor-pointer leading-none"
                  >
                    {flavor.name}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="ingredient" className="mt-4">
          <Tabs defaultValue="category">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="category">Danh mục</TabsTrigger>
              <TabsTrigger value="search">Tìm kiếm</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
              <ScrollArea className="h-[23.5rem]">
                <Accordion type="multiple" className="w-full">
                  {ingredientCategories.map((category) => (
                    <AccordionItem
                      value={`category-${category.id}`}
                      key={category.id}
                    >
                      <AccordionTrigger>{category.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {ingredients
                            .filter((ing) => ing.categoryId === category.id)
                            .map((ingredient) => (
                              <div
                                key={ingredient.id}
                                className="flex items-center space-x-3"
                              >
                                <Checkbox
                                  id={`ingredient-${ingredient.id}`}
                                  checked={selectedIngredientIds.has(
                                    ingredient.id
                                  )}
                                  onCheckedChange={(checked) =>
                                    onIngredientChange(ingredient.id, !!checked)
                                  }
                                />
                                <Label
                                  htmlFor={`ingredient-${ingredient.id}`}
                                  className="font-normal cursor-pointer leading-none"
                                >
                                  {ingredient.name}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="search">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Gõ tên nguyên liệu..."
                  className="pl-8"
                  value={ingredientSearch}
                  onChange={(e) => setIngredientSearch(e.target.value)}
                />
              </div>
              <ScrollArea className="h-48 mt-2">
                <div className="space-y-1 p-1">
                  {filteredIngredients.slice(0, 10).map((ingredient) => (
                    <Button
                      key={ingredient.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleIngredientSearchAdd(ingredient.id)}
                    >
                      {ingredient.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-sm mb-2 text-muted-foreground">
              Đã chọn:
            </h4>
            <ScrollArea className="h-24">
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedIngredientIds).map((id) => {
                  const ing = ingredients.find((i) => i.id === id);
                  return ing ? (
                    <div
                      key={id}
                      className="flex items-center gap-1.5 rounded-full bg-primary/20 text-primary-foreground px-3 py-1 text-xs font-medium"
                    >
                      <span>{ing.name}</span>
                      <button onClick={() => onIngredientChange(id, false)}>
                        <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
