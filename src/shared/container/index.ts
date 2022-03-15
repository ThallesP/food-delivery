import { PrismaClientsRepository } from "modules/clients/infra/prisma/repositories/PrismaClientsRepository";
import { IClientsRepository } from "modules/clients/repositories/IClientsRepository";
import { container } from "tsyringe";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  PrismaClientsRepository
);
