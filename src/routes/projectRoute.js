import { Router } from "express";
import {
  getSingleProject,
  getAllProjects,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectController.js";
import { uploadOptions } from "../helper/imageUpload.js";

const route = Router();

route.get("/", getAllProjects);
route.get("/:id", getSingleProject);
route.post("/", uploadOptions.single("image"), addProject);
route.patch("/:id", editProject);
route.delete("/:id", deleteProject);

export default route;
