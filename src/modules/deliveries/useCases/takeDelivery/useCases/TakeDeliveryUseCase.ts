import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

interface ITakeDelivery {
  delivery_id: string;
  deliveryman_id: string;
}

@injectable()
export class TakeDeliveryUseCase {
  async execute({ delivery_id, deliveryman_id }: ITakeDelivery) {
    const delivery = await prisma.delivery.update({
      where: {
        id: delivery_id,
      },
      data: {
        deliveryman_id,
      },
    });

    return delivery;
  }
}
