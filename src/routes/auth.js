import express from "express";
import { Controllers } from "../controllers";
import { validateSignupData } from "../middleware";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

export default (app) => {
  app.use("/api/auth", router);

  router.post("/local-signup", validateSignupData, Controllers.signup);

  router.post("/local-login", Controllers.login);
};
