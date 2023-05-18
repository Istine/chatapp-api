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

export const saveUserToken = async (token, email) => {};
