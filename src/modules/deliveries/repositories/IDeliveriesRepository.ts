import { Delivery } from "@prisma/client";

import { ICreateDeliveryDTO } from "../dtos/ICreateDeliveryDTO";

export interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
}
