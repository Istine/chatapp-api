import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./models/user.model";

config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  logging: false,
});
