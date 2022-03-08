import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

import { DeliveryNotFoundException } from "@exceptions/DeliveryNotFoundException";
import { MissingPermissionForDeliveryException } from "@exceptions/MissingPermissionForDeliveryException";

interface IUpdateEndDate {
  delivery_id: string;
  deliveryman_id: string;
}

@injectable()
export class UpdateEndDateUseCase {
  async execute({ delivery_id, deliveryman_id }: IUpdateEndDate) {
    const delivery = await prisma.delivery.findFirst({
      where: {
        id: delivery_id,
        end_at: null,
      },
    });

    if (!delivery) {
      throw new DeliveryNotFoundException();
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new MissingPermissionForDeliveryException();
    }

    delivery.end_at = new Date();
    await prisma.delivery.update({
      where: {
        id: delivery.id,
      },
      data: delivery,
    });

    return delivery;
  }
}
