import { IClientsRepository } from "modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllOwnedDeliveriesUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(client_id: string) {
    const deliveries = await this.clientsRepository.findClientDeliveries(
      client_id
    );

    return deliveries;
  }
}
