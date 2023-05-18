import bcrpyt from "../node_modules/bcrypt/bcrypt";

const SALT_ROUNDS = 10;

export const encrypt = (value) => {
  const hash = bcrpyt.hashSync(value, SALT_ROUNDS);
  return hash;
};

export const compare = (original, hash) => {
  return bcrpyt.compareSync(original, hash);
};

export const build = ({ email, password }) => {
  const hashedPassword = encrypt(password);
  return { email, password: hashedPassword };
};
