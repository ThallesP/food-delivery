import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name } = request.body;
    const { client_id } = request.auth;

    const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);
    const delivery = await createDeliveryUseCase.execute({
      item_name,
      client_id,
    });

    return response.json(delivery);
  }
}
