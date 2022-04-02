import { Request, Response, NextFunction } from "express";
import { config } from "../configs";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { InterfaceUser, UserRepository } from "../repositories";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user: InterfaceUser = await new UserRepository().findUser(
    "email",
    email
  );
  if (!user) {
    return res.status(401).json({ message: "Wrong email/password" });
  } else if (user) {
    const loginUser = await bcrypt.compare(req.body.password, user.password);
    if (!loginUser) {
      return res.status(401).json({ message: "Wrong email/password" });
    }
  }
  const token = jsonwebtoken.sign({ email }, config.secretKey, {
    expiresIn: config.expiresIn,
  });
  return res.status(200).json({ token: token });
};
