interface MenuItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  ingredients: string[];
  price: string;
  category: string;
}

export interface Theme {
  id: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  secondaryColor: string;
}
export const menuItems: MenuItem[] = [
  {
    id: "item-1",
    image: "/assets/p4.png",
    alt: "Artisanal Ravioli",
    title: "Truffle Ravioli",
    description: "Hand-crafted pasta filled with ricotta and black truffle",
    ingredients: [
      "House-made pasta",
      "Black truffle",
      "Organic ricotta",
      "Sage butter sauce",
    ],
    price: "$24",
    category: "Pasta",
  },
  {
    id: "item-2",
    image: "/assets/p5.png",
    alt: "Grilled Salmon",
    title: "Cedar Plank Salmon",
    description: "Wild-caught salmon grilled on cedar with seasonal vegetables",
    ingredients: [
      "Wild salmon",
      "Heirloom vegetables",
      "Lemon herb sauce",
      "Microgreens",
    ],
    price: "$32",
    category: "Seafood",
  },
  {
    id: "item-3",
    image: "/assets/p6.png",
    alt: "Seasonal Salad",
    title: "Garden Harvest Bowl",
    description: "Fresh seasonal produce with house vinaigrette",
    ingredients: [
      "Local greens",
      "Heritage tomatoes",
      "Avocado",
      "Toasted seeds",
      "Citrus dressing",
    ],
    price: "$18",
    category: "Salads",
  },
  {
    id: "item-4",
    image: "/assets/p7.png",
    alt: "Braised Short Rib",
    title: "Braised Short Rib",
    description: "48-hour braised beef short rib with smoked potato purée",
    ingredients: [
      "Grass-fed beef",
      "Cabernet reduction",
      "Root vegetables",
      "Smoked potato",
    ],
    price: "$36",
    category: "Mains",
  },
  {
    id: "item-5",
    image: "/assets/p8.png",
    alt: "Citrus Panna Cotta",
    title: "Citrus Panna Cotta",
    description: "Silky vanilla bean panna cotta with seasonal citrus",
    ingredients: [
      "Madagascar vanilla",
      "Local honey",
      "Blood orange",
      "Candied pistachios",
    ],
    price: "$14",
    category: "Desserts",
  },
];

// Seasonal themes
export const themes: Theme[] = [
  {
    id: "spring",
    backgroundImage: "/assets/b1.jpg",
    title: "Spring Awakening",
    subtitle: "Fresh & Vibrant",
    description:
      "Experience the rebirth of flavors with our spring menu, featuring tender shoots, edible flowers, and the first harvests of the season.",
    color: "#7cb518",
    secondaryColor: "#f9c80e",
  },
  {
    id: "summer",
    backgroundImage: "/assets/b2.jpg",
    title: "Summer Bounty",
    subtitle: "Bold & Bright",
    description:
      "Celebrate the height of the growing season with vibrant, sun-ripened ingredients at their peak of flavor and intensity.",
    color: "#f18f01",
    secondaryColor: "#99c1de",
  },
  {
    id: "autumn",
    backgroundImage: "/assets/b3.jpg",
    title: "Autumn Harvest",
    subtitle: "Rich & Comforting",
    description:
      "Savor the earthy richness of fall with our hearty dishes featuring root vegetables, wild mushrooms, and warming spices.",
    color: "#cb904d",
    secondaryColor: "#614124",
  },
  {
    id: "winter",
    backgroundImage: "/assets/b4.jpg",
    title: "Winter Reflection",
    subtitle: "Elegant & Refined",
    description:
      "Find comfort in our winter menu showcasing preserved traditions, slow cooking, and the subtle beauty of cold-weather cuisine.",
    color: "#2d3047",
    secondaryColor: "#8d98a7",
  },
];
