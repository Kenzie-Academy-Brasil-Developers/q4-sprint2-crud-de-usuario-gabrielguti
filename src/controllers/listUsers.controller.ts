import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";
import { InterfaceUser } from "../repositories";

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listUsers: InterfaceUser[] = await new UserRepository().findUsers();
  listUsers.forEach((user: InterfaceUser) => delete user.password);
  return res.status(200).json(listUsers);
};

