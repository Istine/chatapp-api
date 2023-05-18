import * as JWT from "jsonwebtoken";

export const generateToken = (user) => {
  const token = JWT.sign(user, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  }); // expires in 24 hours
  return token;
};
