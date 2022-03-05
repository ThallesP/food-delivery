import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

interface ICreateDelivery {
  item_name: string;
  client_id: string;
}

@injectable()
export class CreateDeliveryUseCase {
  async execute({ item_name, client_id }: ICreateDelivery) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        client_id,
      },
    });

    return delivery;
  }
}
