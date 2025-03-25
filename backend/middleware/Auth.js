import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token first", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided.", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded; // User ID and data stored in req.user
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
