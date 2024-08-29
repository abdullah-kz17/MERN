const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order-controller"); // Adjust the path as needed
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

// Define routes
router.post("/", authMiddleware, createOrder); // Create a new order
router.get("/", authMiddleware, getAllOrders); // Get all orders
router.get("/:id", authMiddleware, getOrderById); // Get a single order by ID
router.put("/:id", authMiddleware, updateOrder); // Update an order by ID
router.delete("/:id", authMiddleware, deleteOrder); // Delete an order by ID

module.exports = router;
