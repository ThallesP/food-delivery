import { AppException } from "./AppException";

export class ClientAlreadyExistsException extends AppException {
  statusCode = 400;
  message = "Client already exists";
  name = "ClientAlreadyExists";
}
