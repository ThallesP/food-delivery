import { hash } from "bcrypt";
import { injectable } from "tsyringe";

import { ClientAlreadyExistsException } from "@exceptions/ClientAlreadyExistsException";

import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

@injectable()
export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const clientExists = await prisma.client.findFirst({
      where: { username: { mode: "insensitive", equals: username } },
    });

    if (clientExists) {
      throw new ClientAlreadyExistsException();
    }

    const passwordHash = await hash(password, 10);

    const client = await prisma.client.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    return client;
  }
}
