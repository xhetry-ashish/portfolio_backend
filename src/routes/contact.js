import { Router } from "express";

import { getMessage, sendMessage } from "../controllers/contact.js";

const route = Router();

route.get("/", getMessage);
route.post("/", sendMessage);

export default route;
