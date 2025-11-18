'use client';

import { useMemo, useState } from 'react';
import { Utensils } from 'lucide-react';
import {
  allDishes,
  allFlavors,
  allIngredientCategories,
  allIngredients,
  dishFlavors,
  dishIngredients,
} from '@/lib/data';
import { DishCard } from '@/components/dish-card';
import { FilterControls } from '@/components/filter-controls';
import { DishSearchBar } from '@/components/dish-search-bar';
import type { Dish } from '@/lib/types';

export default function Home() {
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<Set<number>>(
    new Set()
  );
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<
    Set<number>
  >(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Dish['type'] | 'all'>('all');

  const handleFlavorChange = (flavorId: number, isSelected: boolean) => {
    setSelectedFlavorIds((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(flavorId);
      } else {
        newSet.delete(flavorId);
      }
      return newSet;
    });
  };

  const handleIngredientChange = (
    ingredientId: number,
    isSelected: boolean
  ) => {
    setSelectedIngredientIds((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(ingredientId);
      } else {
        newSet.delete(ingredientId);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    setSelectedFlavorIds(new Set());
    setSelectedIngredientIds(new Set());
    setSelectedType('all');
  };

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      // Search term filter
      if (
        searchTerm &&
        !dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && dish.type !== selectedType) {
        return false;
      }

      // Flavor filter
      if (selectedFlavorIds.size > 0) {
        const dishFlavorIds = new Set(
          dishFlavors.filter((df) => df.dishId === dish.id).map((df) => df.flavorId)
        );
        const hasAllFlavors = [...selectedFlavorIds].every((id) =>
          dishFlavorIds.has(id)
        );
        if (!hasAllFlavors) return false;
      }

      // Ingredient filter
      if (selectedIngredientIds.size > 0) {
        const dishIngredientIds = new Set(
          dishIngredients
            .filter((di) => di.dishId === dish.id)
            .map((di) => di.ingredientId)
        );
        const hasAllIngredients = [...selectedIngredientIds].every((id) =>
          dishIngredientIds.has(id)
        );
        if (!hasAllIngredients) return false;
      }

      return true;
    });
  }, [searchTerm, selectedFlavorIds, selectedIngredientIds, selectedType]);

  const dishData = useMemo(() => {
    return filteredDishes.map((dish) => {
      const flavors = dishFlavors
        .filter((df) => df.dishId === dish.id)
        .map((df) => allFlavors.find((f) => f.id === df.flavorId)!);

      const ingredients = dishIngredients
        .filter((di) => di.dishId === dish.id)
        .map((di) => allIngredients.find((i) => i.id === di.ingredientId)!);
      
      return { dish, flavors, ingredients };
    });
  }, [filteredDishes]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card py-8 px-4 sm:px-6 lg:px-8 text-center border-b">
        <div className="flex justify-center items-center gap-4">
          <Utensils className="h-12 w-12 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-card-foreground tracking-tight">
            Hôm nay ăn gì
          </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Khám phá tinh hoa ẩm thực qua hương vị và nguyên liệu
        </p>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-8">
            <FilterControls
              flavors={allFlavors}
              ingredients={allIngredients}
              ingredientCategories={allIngredientCategories}
              selectedFlavorIds={selectedFlavorIds}
              selectedIngredientIds={selectedIngredientIds}
              selectedType={selectedType}
              onFlavorChange={handleFlavorChange}
              onIngredientChange={handleIngredientChange}
              onTypeChange={setSelectedType}
              onResetFilters={resetFilters}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-8">
              <DishSearchBar onSearch={setSearchTerm} />
            </div>

            {dishData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dishData.map(({ dish, ...rest }) => (
                  <DishCard key={dish.id} dish={dish} {...rest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 px-4 border-2 border-dashed rounded-xl bg-card">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  Không tìm thấy món ăn phù hợp
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Hãy thử thay đổi bộ lọc hoặc tìm kiếm nhé.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
