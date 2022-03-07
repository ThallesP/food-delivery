import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllOwnedDeliveriesUseCase } from "./FindAllOwnedDeliveriesUseCase";

export class FindAllOwnedDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.auth;

    const findAllOwnedDeliveriesUseCase = container.resolve(
      FindAllOwnedDeliveriesUseCase
    );
    const deliveries = await findAllOwnedDeliveriesUseCase.execute(client_id);

    return response.json(deliveries);
  }
}
