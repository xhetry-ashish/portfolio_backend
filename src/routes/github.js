import { Router } from "express";
import {
  addImage,
  addProject,
  getAllProjects,
  getSingleProject,
} from "../controllers/github.js";
import { uploadOptions } from "../helper/imageUpload.js";

const route = Router();

route.get("/add", addProject);
route.patch("/:id", uploadOptions.single("image"), addImage);
route.get("/:id", getSingleProject);
route.get("/", getAllProjects);

export default route;
