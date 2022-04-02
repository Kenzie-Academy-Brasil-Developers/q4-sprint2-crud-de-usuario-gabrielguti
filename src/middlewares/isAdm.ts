import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";
import { InterfaceUser } from "./../repositories";

export const validateAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  const { uuid } = req.body;

  const user: InterfaceUser = await new UserRepository().findUser(
    "email",
    email
  );
  const userUuid: InterfaceUser = await new UserRepository().findUser(
    "uuid",
    uuid
  );
  console.log(req.route.stack[0].method);
  if (
    req.route.stack[0].method === "patch" ||
    req.route.stack[0].method === "delete"
  ) {
    if (!user.isAdm && user.email !== userUuid?.email) {
      return res.status(401).json({ message: "Missing admin permissions" });
    }
  } else if (req.route.stack[0].method === "get" && !user.isAdm) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
};
