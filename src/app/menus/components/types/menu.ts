export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}
export interface OptionChoice {
  value: string;
  priceAdjustment: number;
}
export type Options = Record<string, OptionChoice[]>;

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNew: boolean;
  isSignature: boolean;
  categoryId: string;
  calories: number;
  preparationTime: number;
  additionalImages: string[];
  reviewCount: number;
  rating: number;
  description: string;
  chefNote: string;
  nutritionInfo: Record<"name" | "value", string>[];
  options?: Options;
  dietary?: string[];
  spicyLevel?: number;
  isChefSpecial: boolean;
  winePairing?: string;
}
