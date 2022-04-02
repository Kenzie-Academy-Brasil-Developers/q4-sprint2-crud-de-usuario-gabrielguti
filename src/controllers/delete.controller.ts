import { InterfaceUser, UserRepository } from "../repositories";
import { DeleteResult } from "typeorm";
import { NextFunction, Request, Response } from "express";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;
  const deleteUser: DeleteResult = await new UserRepository().deleteUser(uuid);

  return res.status(200).json({ message: "User deleted with success" });
};
