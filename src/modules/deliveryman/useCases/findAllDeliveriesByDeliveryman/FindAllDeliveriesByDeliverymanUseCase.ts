import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

@injectable()
export class FindAllDeliveriesByDeliverymanUseCase {
  async execute(deliveryman_id: string) {
    const deliveries = await prisma.deliveryman.findFirst({
      where: {
        id: deliveryman_id,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}
