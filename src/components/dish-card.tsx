'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Dish, Flavor, Ingredient } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChefHat, ExternalLink, MapPin, ShoppingCart, Tag } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface DishCardProps {
  dish: Dish;
  flavors: Flavor[];
  ingredients: Ingredient[];
}

export function DishCard({ dish, flavors }: DishCardProps) {
  const recipeSteps =
    dish.type === 'Nấu tại nhà' && dish.recipeOrAddress
      ? dish.recipeOrAddress.split('.').filter(s => s.trim().length > 0)
      : [];

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            data-ai-hint={dish.imageHint}
            fill
            className="object-cover bg-muted"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">
          {dish.name}
        </CardTitle>
        <CardDescription>{dish.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {flavors.slice(0, 3).map((flavor) => (
            <Badge key={flavor.id} variant="outline">
              <Tag className="w-3 h-3 mr-1.5" />
              {flavor.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col items-start gap-3 bg-card">
        {dish.type === 'Quán ăn' ? (
          <div className="w-full p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="w-4 h-4 text-accent" />
              <p>{dish.name}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-6">
              {dish.recipeOrAddress}
            </p>
            {dish.gmapsUrl && (
              <div className="flex gap-2 mt-4 w-full">
                <Button asChild size="sm" className="flex-1">
                  <Link
                    href={dish.gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShoppingCart className="mr-2" />
                    Đặt món ngay
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ChefHat className="w-4 h-4 text-accent" />
              <p>Công thức tại nhà</p>
            </div>
            {dish.recipeOrAddress && (
               <Accordion type="single" collapsible className="w-full mt-2">
               <AccordionItem value="item-1" className="border-none">
                 <AccordionTrigger className="text-sm py-2 hover:no-underline">
                   Xem công thức
                 </AccordionTrigger>
                 <AccordionContent className="text-xs text-muted-foreground space-y-2">
                    {recipeSteps.map((step, index) => (
                      <p key={index}>{step.trim()}.</p>
                    ))}
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
