import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { InvalidTokenException } from "@exceptions/InvalidTokenException";
import { TokenIsMissingException } from "@exceptions/TokenIsMissingException";

interface IPayload {
  sub: string;
}

export function ensureClientAuthentication(
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
    const { sub: client_id } = verify(
      token,
      process.env.JWT_SECRET
    ) as IPayload;

    request.auth = {
      client_id,
    };

    return next();
  } catch (error) {
    throw new InvalidTokenException();
  }
}
