import { Router } from "express";
import {
  getSingleProfile,
  getAllProfiles,
  editProfile,
  addProfile,
  deleteProfile,
} from "../controllers/userProfile.js";

const route = Router();

route.get("/:id", getSingleProfile);
route.get("/", getAllProfiles);
route.post("/", addProfile);
route.patch("/:id", editProfile);
route.delete("/:id", deleteProfile);

export default route;
