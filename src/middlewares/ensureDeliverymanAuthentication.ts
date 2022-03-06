import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { InvalidTokenException } from "@exceptions/InvalidTokenException";
import { TokenIsMissingException } from "@exceptions/TokenIsMissingException";

interface IPayload {
  sub: string;
}

export function ensureDeliverymanAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new TokenIsMissingException();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: deliveryman_id } = verify(
      token,
      process.env.JWT_SECRET_DELIVERYMAN
    ) as IPayload;

    request.auth = {
      client_id: "",
      deliveryman_id,
    };

    return next();
  } catch (error) {
    throw new InvalidTokenException();
  }
}
