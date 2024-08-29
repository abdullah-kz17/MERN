const express = require("express");

const router = express.Router();
const validate = require("../middleware/validate-middleware");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const authController = require("../controllers/auth-controller");

router.route("/login").post(validate(loginSchema), authController.Login);
router
  .route("/register")
  .post(validate(registerSchema), authController.Register);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").post(authController.resetPassword);

module.exports = router;
