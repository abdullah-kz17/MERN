const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db");
const express = require("express");
const authRoute = require("./router/auth-router");
const productRoute = require("./router/product-router");
const orderRoute = require("./router/order-router");
const uploadRoutes = require("./router/upload-router");
const errorMiddleware = require("./middleware/error-middleware");
const cors = require("cors");
const path = require("path");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Authorization",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// Middleware to parse json requests
app.use(express.json());

// Routes=
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

// Make the uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Middleware
app.use(errorMiddleware);

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
