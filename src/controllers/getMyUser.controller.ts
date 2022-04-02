import { Request, Response } from "express";
import { InterfaceUser, UserRepository } from "../repositories";

export const getMyUser = async (req: Request, res: Response) => {
  const { email } = req;
  const user: InterfaceUser = await new UserRepository().findUser(
    "email",
    email
  );
  delete user.password;
  res.status(200).json(user);
};
