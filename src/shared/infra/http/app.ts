import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { EntityValidationError } from "../../errors/ValidationError";
import { NotFoundError } from "../../errors/NotFoundError";

import { router } from "./routes";

import swaggerDocument from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof EntityValidationError) {
      return response.status(400).json({ message: err.message });
    }

    if (err instanceof NotFoundError) {
      return response.status(404).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
