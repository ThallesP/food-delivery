import { compare } from "bcrypt";
import { prisma } from "database/prismaClient";
import { sign } from "jsonwebtoken";
import { injectable } from "tsyringe";

import { UsernameOrPasswordInvalidException } from "@exceptions/UsernameOrPasswordInvalidException";

interface IAuthenticateClient {
  username: string;
  password: string;
}

@injectable()
export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.client.findFirst({
      where: { username: { mode: "insensitive", equals: username } },
    });

    if (!client) {
      throw new UsernameOrPasswordInvalidException();
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new UsernameOrPasswordInvalidException();
    }

    const token = sign(
      { username: client.username },
      process.env.JWT_SECRET_CLIENT,
      {
        subject: client.id,
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
