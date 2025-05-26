import { MenuCategory, MenuItem } from "../types/menu";

export const categories: MenuCategory[] = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    description:
      "Begin your culinary journey with our exquisite selection of appetizers, crafted to tantalize your taste buds.",
  },
  {
    id: "spicy",
    name: "Spicy",
    description:
      "Our signature dishes feature the finest locally-sourced ingredients prepared with passion and creativity.",
  },
  {
    id: "chef",
    name: "Chef Special",
    description:
      "Complete your dining experience with our handcrafted desserts, each a masterpiece of flavor and artistry.",
  },
  {
    id: "pairing",
    name: "Wine Pairing",
    description:
      "Complement your meal with our selection of premium wines, craft cocktails, and non-alcoholic refreshments.",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Truffle Arancini",
    price: 14.95,
    image:
      "https://plus.unsplash.com/premium_photo-1699293238812-9623f4212f8e?q=80&w=4144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Crispy risotto balls infused with black truffle and parmesan",
    fullDescription:
      "Our signature arancini features arborio rice slow-cooked with white wine and parmesan, infused with black truffle, rolled with a center of fontina cheese, lightly breaded and fried to golden perfection. Served with truffle aioli and microgreens.",
    ingredients: [
      "Arborio rice",
      "Black truffle",
      "Parmesan",
      "Fontina cheese",
      "White wine",
      "Breadcrumbs",
      "Herbs",
    ],
    allergens: ["Dairy", "Gluten"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isNew: true,
    isSignature: true,
    categoryId: "vegetarian",
    calories: 320,
    preparationTime: 15,
    dietary: ["vegetarian"],
  },
  {
    id: "item2",
    name: "Mediterranean Mezze Platter",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=4374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Selection of hummus, baba ganoush, olives, and warm pita",
    fullDescription:
      "A bountiful Mediterranean-inspired platter featuring house-made classic hummus, smoky baba ganoush, marinated olives, pickled vegetables, feta cheese, and warm stone-baked pita bread. Perfect for sharing.",
    ingredients: [
      "Chickpeas",
      "Tahini",
      "Eggplant",
      "Olives",
      "Feta cheese",
      "Pita bread",
    ],
    allergens: ["Sesame", "Gluten", "Dairy"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isNew: false,
    isSignature: false,
    categoryId: "vegetarian",
    calories: 450,
    preparationTime: 10,
    dietary: ["vegetarian"],
  },
  {
    id: "item3",
    name: "Seared Scallops",
    price: 19.95,
    image:
      "https://images.unsplash.com/photo-1610898763980-367f03bd7edc?q=80&w=4138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Pan-seared scallops with cauliflower purée and pancetta crumb",
    fullDescription:
      "Sustainably harvested sea scallops seared to perfection, served atop a silky cauliflower purée, drizzled with brown butter, and topped with crispy pancetta crumbs and micro herbs.",
    ingredients: ["Sea scallops", "Cauliflower", "Pancetta", "Butter", "Herbs"],
    allergens: ["Shellfish", "Dairy"],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isNew: false,
    isSignature: true,
    categoryId: "vegetarian",
    calories: 280,
    preparationTime: 18,
    dietary: ["vegetarian"],
  },
  {
    id: "item4",
    name: "Herb-Crusted Rack of Lamb",
    price: 38.95,
    image:
      "https://images.unsplash.com/photo-1610898763980-367f03bd7edc?q=80&w=4138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Dijon and herb-crusted lamb with red wine reduction",
    fullDescription:
      "Premium New Zealand rack of lamb coated with a Dijon mustard and herb crust, roasted to your preference. Served with rosemary-infused potato fondant, seasonal vegetables, and a rich red wine reduction.",
    ingredients: [
      "Lamb rack",
      "Dijon mustard",
      "Fresh herbs",
      "Garlic",
      "Red wine",
      "Potatoes",
      "Seasonal vegetables",
    ],
    allergens: ["Mustard"],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isNew: false,
    isSignature: true,
    categoryId: "spicy",
    calories: 720,
    preparationTime: 25,
    spicyLevel: 3,
  },
  {
    id: "item5",
    name: "Wild Mushroom Risotto",
    price: 24.5,
    image:
      "https://plus.unsplash.com/premium_photo-1700580237151-9f0abd12621d?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Creamy arborio rice with foraged mushrooms and truffle oil",
    fullDescription:
      "Arborio rice slowly cooked with white wine and vegetable broth, finished with a medley of seasonal wild mushrooms, aged parmesan, white truffle oil, and fresh herbs. A rich and earthy vegetarian delight.",
    ingredients: [
      "Arborio rice",
      "Wild mushrooms",
      "Parmesan",
      "White wine",
      "Truffle oil",
      "Herbs",
    ],
    allergens: ["Dairy"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isNew: false,
    isSignature: false,
    categoryId: "spicy",
    calories: 580,
    preparationTime: 22,
    spicyLevel: 3,
  },
  {
    id: "item6",
    name: "Chocolate Fondant",
    price: 12.95,
    image:
      "https://plus.unsplash.com/premium_photo-1669557211332-9328425b6f39?q=80&w=4287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Warm chocolate cake with a molten center and vanilla ice cream",
    fullDescription:
      "A decadent chocolate dessert with a rich molten center, made with premium dark chocolate. Served warm with house-made vanilla bean ice cream, fresh berries, and a dusting of cocoa powder.",
    ingredients: [
      "Dark chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "Flour",
      "Vanilla ice cream",
      "Berries",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isNew: false,
    isSignature: true,
    categoryId: "chef",
    calories: 450,
    preparationTime: 15,
    isChefSpecial: true,
  },
  {
    id: "item7",
    name: "Classic Tiramisu",
    price: 11.5,
    image:
      "https://plus.unsplash.com/premium_photo-1699024273694-38b333ae9f7c?q=80&w=4309&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Coffee-infused ladyfingers layered with mascarpone cream",
    fullDescription:
      "Our authentic Italian tiramisu features delicate ladyfingers soaked in espresso and amaretto, layered with a light mascarpone cream, and dusted with premium cocoa powder. A perfect balance of flavors and textures.",
    ingredients: [
      "Ladyfingers",
      "Mascarpone",
      "Espresso",
      "Amaretto",
      "Eggs",
      "Cocoa powder",
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Alcohol"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isNew: false,
    isSignature: false,
    categoryId: "chef",
    calories: 380,
    preparationTime: 10,
    isChefSpecial: true,
  },
  {
    id: "item8",
    name: "Artisanal Cheese Board",
    price: 18.95,
    image:
      "https://plus.unsplash.com/premium_photo-1700488746600-7e4bf765c193?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Selection of premium cheeses with accompaniments",
    fullDescription:
      "A carefully curated selection of local and imported artisanal cheeses, served with house-made fruit compote, honey, artisanal crackers, and fresh fruits. Perfect for sharing or as a sophisticated end to your meal.",
    ingredients: [
      "Assorted cheeses",
      "Seasonal fruits",
      "Honey",
      "Nuts",
      "Crackers",
    ],
    allergens: ["Dairy", "Gluten", "Nuts"],
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isNew: true,
    isSignature: false,
    categoryId: "pairing",
    calories: 520,
    preparationTime: 10,
    winePairing: "yes",
  },
];
