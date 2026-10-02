const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products — list all, optionally filter by category or search
router.get("/", (req, res) => {
  let result = [...products];
  const { category, search } = req.query;

  if (category && category !== "All") {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, data: result, count: result.length });
});

// GET /api/products/categories — list unique categories
router.get("/categories", (req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.json({ success: true, data: categories });
});

// GET /api/products/:id — single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
