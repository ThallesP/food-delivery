import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

@injectable()
export class FindAllDeliveriesAvailableUseCase {
  async execute() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        deliveryman_id: null,
      },
    });

    return deliveries;
  }
}
