const express = require("express");
const router = express.Router();
const products = require("../data/products");

// In-memory cart store
let cart = [];

// GET /api/cart — get cart with computed totals
router.get("/", (req, res) => {
  const enriched = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0,
    };
  });

  const total = enriched.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    data: {
      items: enriched,
      itemCount: enriched.reduce((sum, item) => sum + item.quantity, 0),
      total: +total.toFixed(2),
    },
  });
});

// POST /api/cart — add item (or increment quantity)
router.post("/", (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, message: "productId is required" });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity, addedAt: new Date().toISOString() });
  }

  res.json({ success: true, message: `${product.name} added to cart` });
});

// PUT /api/cart/:productId — update quantity
router.put("/:productId", (req, res) => {
  const { quantity } = req.body;
  const item = cart.find((i) => i.productId === req.params.productId);

  if (!item) {
    return res.status(404).json({ success: false, message: "Item not in cart" });
  }

  if (quantity <= 0) {
    cart = cart.filter((i) => i.productId !== req.params.productId);
    return res.json({ success: true, message: "Item removed from cart" });
  }

  item.quantity = quantity;
  res.json({ success: true, message: "Quantity updated" });
});

// DELETE /api/cart/:productId — remove item
router.delete("/:productId", (req, res) => {
  const idx = cart.findIndex((i) => i.productId === req.params.productId);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Item not in cart" });
  }
  cart.splice(idx, 1);
  res.json({ success: true, message: "Item removed" });
});

// DELETE /api/cart — clear cart
router.delete("/", (req, res) => {
  cart = [];
  res.json({ success: true, message: "Cart cleared" });
});

// Expose cart for orders module
router.getCart = () => cart;
router.clearCart = () => { cart = []; };

module.exports = router;
