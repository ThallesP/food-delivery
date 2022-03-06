import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllDeliveriesAvailableUseCase } from "./FindAllDeliveriesAvailableUseCase";

export class FindAllDeliveriesAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllDeliveriesAvailableUseCase = container.resolve(
      FindAllDeliveriesAvailableUseCase
    );
    const deliveries = await findAllDeliveriesAvailableUseCase.execute();

    return response.json(deliveries);
  }
}
