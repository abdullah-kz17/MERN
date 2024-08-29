const adminMiddleware = async (req, res, next) => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // Check if the user is an admin
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not an admin" });
    }

    // If the user is an admin, proceed to the next middleware or route
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = adminMiddleware;
