import { StatusCodes } from "http-status-codes";
import { createNewUser } from "./methods/signup";
import { authenticateUser } from "./methods/loign";

export const Controllers = {
  async login(req, res, next) {
    try {
      const [token, error] = await authenticateUser(req.body);
      return res.status(StatusCodes.OK).json({ error: error, token });
    } catch (error) {
      next(error);
    }
  },

  async signup(req, res, next) {
    try {
      const [token, error] = await createNewUser(req.body);
      return res.status(StatusCodes.CREATED).json({ error: error, token });
    } catch (error) {
      next(error);
    }
  },
};
