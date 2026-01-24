import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const signToken = (user) => {
  const payload = {
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      cart: user.cart,
      role: user.role
    }
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpires });
};
