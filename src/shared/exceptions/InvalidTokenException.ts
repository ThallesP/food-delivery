import { AppException } from "./AppException";

export class InvalidTokenException extends AppException {
  message = "Invalid Token";
  name = "InvalidToken";
  statusCode = 401;
}
