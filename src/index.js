import express, { json } from "express";
import cors from "cors";
import routes from "./routes";
import http from "http";
import { AppDataSource } from "./db";
import { Server } from "socket.io";
import "reflect-metadata";

async function bootStrap() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
    },
  });
  app.use(json());
  app.use(cors({ origin: "http://localhost:4200" }));
  app.use(express.urlencoded({ extended: true }));
  routes(app);
  io.on("connection", (socket) => {
    socket.on("message", (data) => {});
  });

  await AppDataSource.initialize();
  console.log(`App has connected to the ${process.env.DB_NAME} database`);
  server.listen(PORT, () => console.log(`App listening at port ${PORT}`));
  app.use((error, req, res, next) => {
    return res
      .status(400)
      .json({ message: "oops! An error occured", error: error.message });
  });
}

bootStrap();
