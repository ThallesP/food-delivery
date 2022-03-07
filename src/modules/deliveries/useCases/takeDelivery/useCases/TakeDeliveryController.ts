import { Request, Response } from "express";
import { container } from "tsyringe";

import { TakeDeliveryUseCase } from "./TakeDeliveryUseCase";

export class TakeDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: delivery_id } = request.params;
    const { deliveryman_id } = request.auth;

    const takeDeliveryUseCase = container.resolve(TakeDeliveryUseCase);
    const delivery = await takeDeliveryUseCase.execute({
      delivery_id,
      deliveryman_id,
    });

    return response.json(delivery);
  }
}
