import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { InterfaceUser, UserRepository } from "../repositories";
import { UpdateResult } from "typeorm";

export const editUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { body } = req;
  if (req.body.password) {
    const hashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashed;
  }
  for (const [key, value] of Object.entries(body)) {
    if (key !== "isAdm") {
      const updatedUser: UpdateResult = await new UserRepository().editUser(
        uuid,
        {
          [key]: value,
        }
      );
    }
  }
  const user: InterfaceUser = await new UserRepository().findUser("uuid", uuid);
  delete user.password;
  return res.status(200).json(user);
};
