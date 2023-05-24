import { AppDataSource } from "../db";
import { User } from "../models/user.model";
export const createUser = async (userData) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(userData);
  return await userRepo.save(user);
};

export const findUser = async ({ email, password }) => {
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.findOne({ where: { email } });
};

export const saveUserToken = async (token, email) => {
  await AppDataSource.transaction(async (manager) => {
    const userInDB = await manager.findOne(User, {
      where: {
        email,
      },
    });
    const tokens = [...userInDB.tokens, token];
    await manager.query(
      `UPDATE users SET tokens='${tokens}' WHERE email=${email};`
    );
  });
  return ["saved", null];
};
