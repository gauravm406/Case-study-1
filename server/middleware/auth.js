import jwt from "jsonwebtoken";
import User from "../models/user.js";

// protect router
export const protect = async (req, res, next) => {
  let token;

  // get token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get users details excluding password
      req.user = await User.findById(decoded.userId);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
};
