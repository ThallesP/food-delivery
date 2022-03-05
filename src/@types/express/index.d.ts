/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    auth: {
      client_id: string;
    };
  }
}
