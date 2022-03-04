import { AppException } from "./AppException";

export class UsernameOrPasswordInvalidException extends AppException {
  message = "Username or password is invalid";
  name = "UsernameOrPasswordInvalid";
  statusCode = 403;
}
