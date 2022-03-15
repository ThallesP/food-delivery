import { prisma } from "database/prismaClient";
import { ICreateClientDTO } from "modules/clients/dtos/ICreateClientDTO";
import { IClientsRepository } from "modules/clients/repositories/IClientsRepository";

import { Client } from "@prisma/client";

export class PrismaClientsRepository implements IClientsRepository {
  async findClientDeliveries(client_id: string): Promise<Client | null> {
    const deliveries = await prisma.client.findFirst({
      where: {
        id: client_id,
      },
      include: {
        deliveries: true,
      },
    });

    return deliveries;
  }

  async findByUsername(username: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: { username: { mode: "insensitive", equals: username } },
    });

    return client;
  }

  async create({ password, username }: ICreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        username,
        password,
      },
    });

    return client;
  }
}
