import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

@injectable()
export class FindAllOwnedDeliveriesUseCase {
  async execute(client_id: string) {
    const deliveries = await prisma.client.findFirst({
      where: {
        id: client_id,
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
