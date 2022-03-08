import { Router } from "express";
import { ensureClientAuthentication } from "middlewares/ensureClientAuthentication";
import { ensureDeliverymanAuthentication } from "middlewares/ensureDeliverymanAuthentication";
import { AuthenticateClientController } from "modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { FindAllOwnedDeliveriesController } from "modules/clients/useCases/findAllOwnedDeliveries/FindAllOwnedDeliveriesController";
import { CreateDeliveryController } from "modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllDeliveriesAvailableController } from "modules/deliveries/useCases/findAllDeliveriesAvailable/FindAllDeliveriesAvailableController";
import { TakeDeliveryController } from "modules/deliveries/useCases/takeDelivery/useCases/TakeDeliveryController";
import { CreateDeliverymanController } from "modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesByDeliverymanController } from "modules/deliveryman/useCases/findAllDeliveriesByDeliveryman/FindAllDeliveriesByDeliverymanController";

import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllDeliveriesAvailableController =
  new FindAllDeliveriesAvailableController();
const takeDeliveryController = new TakeDeliveryController();
const findAllOwnedDeliveriesController = new FindAllOwnedDeliveriesController();
const findAllDeliveriesByDeliverymanController =
  new FindAllDeliveriesByDeliverymanController();

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
routes.get(
  "/delivery/available",
  ensureDeliverymanAuthentication,
  findAllDeliveriesAvailableController.handle
);
routes.put(
  "/delivery/:id/take",
  ensureDeliverymanAuthentication,
  takeDeliveryController.handle
);
routes.get(
  "/client/deliveries",
  ensureClientAuthentication,
  findAllOwnedDeliveriesController.handle
);
routes.get(
  "/deliveryman/deliveries",
  ensureDeliverymanAuthentication,
  findAllDeliveriesByDeliverymanController.handle
);
