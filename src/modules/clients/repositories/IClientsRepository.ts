import { Client } from "@prisma/client";

import { ICreateClientDTO } from "../dtos/ICreateClientDTO";

export interface IClientsRepository {
  findByUsername(username: string): Promise<Client | null>;

  create({ password, username }: ICreateClientDTO): Promise<Client>;
}
