import { AppException } from "./AppException";

export class MissingPermissionForDeliveryException extends AppException {
  message = "You don't have permission to update this delivery";
  statusCode = 403;
  name = "MissingPermissionForDelivery";
}
