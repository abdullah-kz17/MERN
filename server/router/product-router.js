const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

// POST a new product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);
// GET all products
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.getAllProducts
);
// GET a single product
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.getProductById
);
// PUT update a product
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);
// DELETE a product
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;
