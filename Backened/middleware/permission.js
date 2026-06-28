const canEditProducts = (req, res, next) => {
  if (req.user.role === "admin") return next();

  if (req.user.permission === "editor") return next();

  return res.status(403).json({ message: "No edit permission" });
};

module.exports = canEditProducts;