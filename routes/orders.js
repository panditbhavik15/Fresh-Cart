const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = require("../data/products");
const cartRouter = require("./cart");

// In-memory orders store
const orders = [];

// POST /api/orders — place an order from current cart
router.post("/", (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and address are required",
    });
  }

  const cartItems = cartRouter.getCart();

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty. Add items before placing an order.",
    });
  }

  const orderItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: item.productId,
      name: product ? product.name : "Unknown",
      emoji: product ? product.emoji : "",
      price: product ? product.price : 0,
      quantity: item.quantity,
      subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0,
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = {
    id: uuidv4(),
    items: orderItems,
    total: +total.toFixed(2),
    customer: { name, email, phone: phone || "", address },
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  cartRouter.clearCart();

  res.status(201).json({ success: true, data: order });
});

// GET /api/orders — list all orders
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ),
  });
});

// GET /api/orders/:id — single order
router.get("/:id", (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
