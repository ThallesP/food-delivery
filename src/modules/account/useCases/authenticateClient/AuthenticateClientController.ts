import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase
    );
    const token = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json(token);
  }
}
