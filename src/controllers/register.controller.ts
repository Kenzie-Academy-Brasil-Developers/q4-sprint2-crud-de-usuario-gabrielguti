import { Request, Response, NextFunction } from "express";
import { config } from "../configs";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { InterfaceUser, UserRepository } from "../repositories";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashed;
    const user: InterfaceUser = new UserRepository().postUsers(req.body);
    const save: InterfaceUser = await new UserRepository().saveUsers(user);
    delete user.password;
    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "E-mail already registered" });
  }
};
