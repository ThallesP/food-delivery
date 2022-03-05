import { AppException } from "./AppException";

export class TokenIsMissingException extends AppException {
  message = "Token is missing";
  name = "TokenIsMissing";
  statusCode = 401;
}
