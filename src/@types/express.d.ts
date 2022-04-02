import { InterfaceUser } from "../repositories";

declare global {
  namespace Express {
    interface Request {
      email: string;
      user: InterfaceUser;
      validated: InterfaceUser;
    }
  }
}
