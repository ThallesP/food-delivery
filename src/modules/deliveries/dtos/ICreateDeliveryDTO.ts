import { Client, Deliveryman } from "@prisma/client";

export interface ICreateDeliveryDTO {
  item_name: string;
  client_id: string;
  client: Client;
  deliveryman_id?: string;
  deliveryman?: Deliveryman;
  created_at: Date;
  end_at?: Date;
}
