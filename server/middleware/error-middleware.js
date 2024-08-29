const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Back End";
  const status = err.status || 500;
  const extraDetails = err.extraDetails || "Error from Backend";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
