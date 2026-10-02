const products = [
  // 🍎 Fruits
  { id: "f1", name: "Red Apple", category: "Fruits", price: 3.49, emoji: "🍎", description: "Crisp and sweet red apples, perfect for snacking", unit: "kg", inStock: true },
  { id: "f2", name: "Banana", category: "Fruits", price: 1.29, emoji: "🍌", description: "Ripe golden bananas, rich in potassium", unit: "bunch", inStock: true },
  { id: "f3", name: "Orange", category: "Fruits", price: 4.99, emoji: "🍊", description: "Juicy navel oranges, bursting with vitamin C", unit: "kg", inStock: true },
  { id: "f4", name: "Strawberry", category: "Fruits", price: 5.99, emoji: "🍓", description: "Fresh sweet strawberries, hand-picked", unit: "pack", inStock: true },
  { id: "f5", name: "Mango", category: "Fruits", price: 6.49, emoji: "🥭", description: "Tropical Alphonso mangoes, naturally sweet", unit: "each", inStock: true },
  { id: "f6", name: "Grapes", category: "Fruits", price: 4.29, emoji: "🍇", description: "Seedless green grapes, crisp and refreshing", unit: "pack", inStock: true },

  // 🥦 Vegetables
  { id: "v1", name: "Broccoli", category: "Vegetables", price: 2.99, emoji: "🥦", description: "Fresh organic broccoli crowns", unit: "head", inStock: true },
  { id: "v2", name: "Carrot", category: "Vegetables", price: 1.99, emoji: "🥕", description: "Crunchy orange carrots, farm-fresh", unit: "kg", inStock: true },
  { id: "v3", name: "Spinach", category: "Vegetables", price: 3.49, emoji: "🥬", description: "Baby spinach leaves, pre-washed and ready", unit: "pack", inStock: true },
  { id: "v4", name: "Tomato", category: "Vegetables", price: 2.49, emoji: "🍅", description: "Vine-ripened tomatoes, full of flavor", unit: "kg", inStock: true },
  { id: "v5", name: "Bell Pepper", category: "Vegetables", price: 3.99, emoji: "🫑", description: "Mixed bell peppers — red, yellow, green", unit: "pack", inStock: true },

  // 🥛 Dairy
  { id: "d1", name: "Whole Milk", category: "Dairy", price: 3.99, emoji: "🥛", description: "Fresh whole milk, pasteurized", unit: "liter", inStock: true },
  { id: "d2", name: "Cheddar Cheese", category: "Dairy", price: 5.49, emoji: "🧀", description: "Aged sharp cheddar, perfect for cooking", unit: "block", inStock: true },
  { id: "d3", name: "Greek Yogurt", category: "Dairy", price: 4.29, emoji: "🍶", description: "Creamy plain Greek yogurt, high protein", unit: "tub", inStock: true },
  { id: "d4", name: "Butter", category: "Dairy", price: 3.79, emoji: "🧈", description: "Unsalted butter, perfect for baking", unit: "pack", inStock: true },
  { id: "d5", name: "Farm Eggs", category: "Dairy", price: 4.99, emoji: "🥚", description: "Free-range eggs, dozen pack", unit: "dozen", inStock: true },

  // 🍞 Bakery
  { id: "b1", name: "Sourdough Bread", category: "Bakery", price: 4.49, emoji: "🍞", description: "Artisan sourdough, freshly baked", unit: "loaf", inStock: true },
  { id: "b2", name: "Croissant", category: "Bakery", price: 2.99, emoji: "🥐", description: "Buttery French croissants, flaky layers", unit: "pack of 4", inStock: true },
  { id: "b3", name: "Blueberry Muffin", category: "Bakery", price: 3.49, emoji: "🧁", description: "Moist blueberry muffins, homestyle", unit: "pack of 2", inStock: true },
  { id: "b4", name: "Bagel", category: "Bakery", price: 3.99, emoji: "🥯", description: "Everything bagels, chewy and dense", unit: "pack of 6", inStock: true },
  { id: "b5", name: "Chocolate Cake", category: "Bakery", price: 12.99, emoji: "🎂", description: "Rich double chocolate layer cake", unit: "whole", inStock: true },

  // 🥤 Beverages
  { id: "bv1", name: "Spring Water", category: "Beverages", price: 1.49, emoji: "💧", description: "Natural spring water, 1.5L bottle", unit: "bottle", inStock: true },
  { id: "bv2", name: "Orange Juice", category: "Beverages", price: 4.99, emoji: "🧃", description: "100% fresh-squeezed orange juice", unit: "liter", inStock: true },
  { id: "bv3", name: "Ground Coffee", category: "Beverages", price: 8.99, emoji: "☕", description: "Premium Arabica ground coffee", unit: "bag", inStock: true },
  { id: "bv4", name: "Green Tea", category: "Beverages", price: 5.49, emoji: "🍵", description: "Organic Japanese green tea bags", unit: "box of 20", inStock: true },
  { id: "bv5", name: "Berry Smoothie", category: "Beverages", price: 6.99, emoji: "🫐", description: "Mixed berry smoothie, ready to drink", unit: "bottle", inStock: true },

  // 🍿 Snacks
  { id: "s1", name: "Potato Chips", category: "Snacks", price: 3.29, emoji: "🍟", description: "Sea salt kettle-cooked chips", unit: "bag", inStock: true },
  { id: "s2", name: "Mixed Nuts", category: "Snacks", price: 7.99, emoji: "🥜", description: "Premium roasted mixed nuts, unsalted", unit: "jar", inStock: true },
  { id: "s3", name: "Granola Bar", category: "Snacks", price: 4.49, emoji: "🌾", description: "Honey oat granola bars, no added sugar", unit: "box of 6", inStock: true },
  { id: "s4", name: "Dark Chocolate", category: "Snacks", price: 3.99, emoji: "🍫", description: "72% cacao dark chocolate bar", unit: "bar", inStock: true },
  { id: "s5", name: "Dried Mango", category: "Snacks", price: 5.49, emoji: "🥭", description: "No-sugar-added dried mango slices", unit: "pack", inStock: true },
];

module.exports = products;
