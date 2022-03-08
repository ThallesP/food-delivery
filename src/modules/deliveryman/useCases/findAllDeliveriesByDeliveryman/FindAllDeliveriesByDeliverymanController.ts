import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllDeliveriesByDeliverymanUseCase } from "./FindAllDeliveriesByDeliverymanUseCase";

export class FindAllDeliveriesByDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id } = request.auth;
    const findAllDeliveriesByDeliverymanUseCase = container.resolve(
      FindAllDeliveriesByDeliverymanUseCase
    );
    const deliveries = await findAllDeliveriesByDeliverymanUseCase.execute(
      deliveryman_id
    );

    return response.json(deliveries);
  }
}
