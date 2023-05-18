import express, { json } from "express";
import routes from "./routes";
import { AppDataSource } from "./db";
import "reflect-metadata";
const app = express();
const PORT = process.env.PORT || 3000;

async function bootStrap(app) {
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  routes(app);
  await AppDataSource.initialize();
  console.log(`App has connected to the ${process.env.DB_NAME} database`);
  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
  app.use((error, req, res, next) => {
    return res
      .status(400)
      .json({ message: "oops! An error occured", error: error.message });
  });
}

bootStrap(app);
