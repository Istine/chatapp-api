import { build, compare } from "../../../utils";
import { generateToken } from "../../../services/jwt_service";
import { findUser, saveUserToken } from "../../../services/user";
export const authenticateUser = async (user = {}) => {
  const builtUser = build(user);
  const userInDB = await findUser(builtUser);
  if (userInDB) {
    const doPasswordsMatch = compare(user.password, userInDB.password);
    if (doPasswordsMatch) {
      const token = generateToken(userInDB.email);
      await saveUserToken(token, userInDB.email);
      return [token, null];
    }
    return [null, "invalid email or password"];
  }
  return [null, "user does not exist"];
};
