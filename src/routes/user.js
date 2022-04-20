import { Router } from "express";

import {
  getSingleUser,
  getAllUsers,
  addUser,
  login,
} from "../controllers/user.js";

const route = Router();

route.get("/:id", getSingleUser);
route.get("/", getAllUsers);
route.post("/register", addUser);
route.post("/login", login);

export default route;
