const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  // Check if the token starts with "Bearer "
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  // Remove "Bearer " prefix
  const jwtToken = token.replace("Bearer ", "").trim();
  console.log("Token from auth middleware", jwtToken);

  try {
    // Verify the token and extract the payload
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    // Use user ID from the token for lookup
    const userData = await User.findById(isVerified.id).select({ password: 0 });
    if (!userData) {
      return res.status(401).json({ msg: "User not found" });
    }
    console.log(userData);

    // Attach user data and token to the request object
    req.user = userData;
    req.token = jwtToken;
    req.ID = userData._id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
