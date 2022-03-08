import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id } = request.auth;
    const { id: delivery_id } = request.params;

    const updateEndDateUseCase = container.resolve(UpdateEndDateUseCase);
    const delivery = await updateEndDateUseCase.execute({
      deliveryman_id,
      delivery_id,
    });

    return response.json(delivery);
  }
}
