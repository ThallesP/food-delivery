import { Router } from "express";
import { ensureClientAuthentication } from "middlewares/ensureClientAuthentication";
import { AuthenticateClientController } from "modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliveryController } from "modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

routes.post("/clients/", createClientController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);
routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);
routes.post(
  "/delivery",
  ensureClientAuthentication,
  createDeliveryController.handle
);
