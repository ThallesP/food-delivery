import { AppException } from "./AppException";

export class DeliverymanAlreadyExistsException extends AppException {
  message = "Deliveryman already exists";
  name = "DeliverymanAlreadyExists";
  statusCode = 400;
}
