import { createUser, findUser } from "../services/user";
import { generateToken } from "../services/jwt_service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { build, compare } from "../utils";

export const Controllers = {
  async login(req, res, next) {
    try {
      const builtUser = build(req.body);
      const { password, tokens, ...user } = await findUser(builtUser);
      const doPasswordsMatch = compare(req.body.password, password);
      if (doPasswordsMatch) {
        const token = generateToken(user);
        return res
          .status(StatusCodes.OK)
          .json({ message: ReasonPhrases.OK, token });
      }
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    } catch (error) {
      next(error);
    }
  },

  async signup(req, res, next) {
    try {
      const builtUser = build(req.body);
      const token = generateToken(builtUser);
      const body = { ...builtUser, tokens: `[${token}]` };
      const { password, tokens, ...user } = await createUser(body); // create user
      return res
        .status(StatusCodes.CREATED)
        .json({ message: ReasonPhrases.CREATED, user, token });
    } catch (error) {
      next(error);
    }
  },
};
