import { build } from "../../../utils";
import { createUser } from "../../../services/user";
import { generateToken } from "../../../services/jwt_service";

export const createNewUser = async (user = {}) => {
  const builtUser = build(user);
  const token = generateToken(builtUser);
  const body = { ...builtUser, tokens: `[${token}]` };
  const userInDB = await createUser(body);
  return [token, null];
};
