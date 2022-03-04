import { hash } from "bcrypt";
import { prisma } from "database/prismaClient";
import { injectable } from "tsyringe";

import { DeliverymanAlreadyExistsException } from "@exceptions/DeliverymanAlreadyExistsException";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

@injectable()
export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: { username: { mode: "insensitive", equals: username } },
    });

    if (deliverymanExists) {
      throw new DeliverymanAlreadyExistsException();
    }

    const passwordHash = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    return deliveryman;
  }
}
