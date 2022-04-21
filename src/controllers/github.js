import mongoose from "mongoose";
import Project from "../models/GithubProject.js";
import User from "../models/User.js";
import axios from "axios";
import Github from "../models/GithubProject.js";

//creating project
export const addProject = async (req, res) => {
  try {
    const resp = await axios.get(
      "https://api.github.com/users/xhetry-ashish/repos"
    );
    resp.data.forEach(async (items) => {
      await new Project({
        projectname: items.name,
        description: items.description,
        githubLink: items.html_url,
        dateCreated: items.created_at,
      }).save();
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//editing project
export const addImage = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.user)) {
      res.status(401).json({ success: false, message: "Invalid user id" });
    }
    const fileName = req.file.filename;
    const filePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let project = {
      image: `${filePath}${fileName}`,
    };

    project = await Github.findByIdAndUpdate(req.params.id, project, {
      new: true,
    });
    if (!project) {
      throw "Image update failed";
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};
