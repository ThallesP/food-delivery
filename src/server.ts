import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import { AppException } from "@exceptions/AppException";

import "@shared/container";

import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppException) {
      return response
        .status(err.statusCode)
        .json({ error: err.name, message: err.message });
    }

    return response
      .status(500)
      .json({ error: "InternalServerError", message: "Internal server error" });
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log("> Server is running");
});
