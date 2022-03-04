/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}
