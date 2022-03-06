import { compare } from "bcrypt";
import { prisma } from "database/prismaClient";
import { sign } from "jsonwebtoken";
import { injectable } from "tsyringe";

import { UsernameOrPasswordInvalidException } from "@exceptions/UsernameOrPasswordInvalidException";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

@injectable()
export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username: { mode: "insensitive", equals: username } },
    });

    if (!deliveryman) {
      throw new UsernameOrPasswordInvalidException();
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new UsernameOrPasswordInvalidException();
    }

    const token = sign(
      { username: deliveryman.username },
      process.env.JWT_SECRET_DELIVERYMAN,
      {
        subject: deliveryman.id,
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
