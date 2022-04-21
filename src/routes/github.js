import { Router } from "express";
import { addProject } from "../controllers/github.js";
//import { uploadOptions } from "../helper/imageUpload.js";

const route = Router();

route.get("/", addProject);

export default route;
