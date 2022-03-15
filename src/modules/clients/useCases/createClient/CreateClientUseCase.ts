import { hash } from "bcrypt";
import { IClientsRepository } from "modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

import { ClientAlreadyExistsException } from "@exceptions/ClientAlreadyExistsException";

interface ICreateClient {
  username: string;
  password: string;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ username, password }: ICreateClient) {
    const clientExists = await this.clientsRepository.findByUsername(username);

    if (clientExists) {
      throw new ClientAlreadyExistsException();
    }

    const passwordHash = await hash(password, 10);

    const client = await this.clientsRepository.create({
      username,
      password: passwordHash,
    });

    return client;
  }
}
