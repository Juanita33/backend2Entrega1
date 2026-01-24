import { signToken } from "../utils/jwt.js";

export const SessionsService = {
  loginResponse: (user) => {
    const token = signToken(user);
    return { token };
  }
};
