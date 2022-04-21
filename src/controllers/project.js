import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";

//getting a project using id
export const getSingleProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "Invalid Project Id";
    }
    const project = await Project.findById(req.params.id).populate("user");
    if (!project) {
      throw "Project Id Not found";
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//get all projects
export const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find().populate("user");
    if (!project) {
      throw "No Projects Found";
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//creating project
export const addProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.user)) {
      res.status(401).json({ success: false, message: "Invalid user id" });
    }
    const user = await User.findById(req.body.user);

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid user id" });
    }
    const file = req.file;
    if (!file) {
      throw "No image uploaded";
    }
    const fileName = req.file.filename;
    const filePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let project = new Project({
      name: req.body.name,
      description: req.body.description,
      image: `${filePath}${fileName}`,
      github: req.body.github,
      user: req.body.user,
    });

    project = await project.save();
    if (!project) {
      throw "Project creation failed";
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//editing project
export const editProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.user)) {
      res.status(401).json({ success: false, message: "Invalid user id" });
    }
    const user = await User.findById(req.body.user);

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid user id" });
    }
    const fileName = req.file.filename;
    const filePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let project = {
      name: req.body.name,
      description: req.body.description,
      image: `${filePath}${fileName}`,
      github: req.body.github,
      user: req.body.user,
    };

    project = await Project.findByIdAndUpdate(req.params.id, project, {
      new: true,
    });
    if (!project) {
      throw "Project update failed";
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(401).json({ success: false, message: "Invalid Project Id" });
    }

    const project = await Project.findByIdAndRemove(req.params.id);
    if (!project) {
      res.status(401).json({ success: false, message: "Invalid Project Id" });
    }
    res.status(200).json({ success: true, message: "project deleted" });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};
