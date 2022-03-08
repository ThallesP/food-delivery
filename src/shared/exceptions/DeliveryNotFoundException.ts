import { AppException } from "./AppException";

export class DeliveryNotFoundException extends AppException {
  message = "Delivery not found";
  name = "DeliveryNotFound";
  statusCode = 404;
}
