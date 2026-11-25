import { verifyToken } from "../utils/jwt.utils.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const payload = await verifyToken(authHeader.split(" ")[1]);
      req.user = payload;
      return next();
    } catch (err) {
      console.log(err.message);
    }
  }
  return res.status(401).json({
    message: "Authentication required.",
  });
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        message: "Authentication required.",
      });
    }
  };
