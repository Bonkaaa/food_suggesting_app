export interface Flavor {
  id: number;
  name: string;
}

export interface IngredientCategory {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  recipeOrAddress: string | null;
  gmapsUrl: string | null;
  type: 'Nấu tại nhà' | 'Quán ăn';
}

// The Restaurant type is no longer needed as its data is merged into Dish
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  imageHint: string;
  gmapsUrl: string;
  description: string;
}

export interface DishFlavor {
  dishId: number;
  flavorId: number;
}

export interface DishIngredient {
  dishId: number;
  ingredientId: number;
}

// This is no longer needed
export interface DishRestaurant {
  dishId: number;
  restaurantId: number;
}
