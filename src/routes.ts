import { Router } from "express";
import { listUsers, login, register } from "./controllers";
import { validateShape } from "./middlewares/shape";
import { RegisterSchema } from "./shapes/register";
import { LoginSchema } from "./shapes/login";
import { validateToken } from "./middlewares/token";
import { validateAdm } from "./middlewares/isAdm";
import { editUser } from "./controllers/edit.controller";
import { deleteUser } from "./controllers/delete.controller";
import { getMyUser } from "./controllers/getMyUser.controller";
const router = Router();
router.post("/users", validateShape(RegisterSchema), register);
router.post("/login", validateShape(LoginSchema), login);
router.patch("/users/:uuid", validateToken, validateAdm, editUser);
router.delete("/users/:uuid", validateToken, validateAdm, deleteUser);
router.get("/users", validateToken, validateAdm, listUsers);
router.get("/users/profile", validateToken, getMyUser);

export default router;
