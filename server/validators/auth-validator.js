const { z } = require("zod");

// Define the login schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "At least 3 characters are required for email" })
    .max(255, { message: "Email cannot be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "At least 7 characters are required for password" })
    .max(1024, { message: "Password cannot be more than 1024 characters" }),
});

// Define the signup schema by extending the login schema
const registerSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "At least 3 characters are required for name" })
    .max(255, { message: "Name cannot be more than 255 characters" }),
});

module.exports = { registerSchema, loginSchema };
