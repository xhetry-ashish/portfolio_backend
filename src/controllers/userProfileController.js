import mongoose from "mongoose";
import Profile from "../models/Profile.js";

//getting a profile using id
export const getSingleProfile = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "Invalid Profile Id";
    }
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      throw "Profile Id Not found";
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//get all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.find();
    if (!profile) {
      throw "No Profiles Found";
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//creating profile
export const addProfile = async (req, res) => {
  let profiledata = new Profile({
    name: req.body.name,
    profileRole: req.body.profileRole,
    profileTagline: req.body.profileTagline,
    facebookLink: req.body.facebookLink,
    instagramLink: req.body.instagramLink,
    githubLink: req.body.githubLink,
    linkedinLink: req.body.linkedinLink,
  });
  try {
    profiledata = await profiledata.save();
    if (!profiledata) {
      throw err;
    }

    res.status(200).json({ success: true, data: profiledata });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//editing profile
export const editProfile = async (req, res) => {
  let profiledata = {
    name: req.body.name,
    profileRole: req.body.profileRole,
    profileTagline: req.body.profileTagline,
    facebookLink: req.body.facebookLink,
    instagramLink: req.body.instagramLink,
    githubLink: req.body.githubLink,
    linkedinLink: req.body.linkedinLink,
  };

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "Invalid Profile Id";
    }

    let data = await Profile.findByIdAndUpdate(req.params.id, profiledata, {
      new: true,
    });

    if (!data) {
      throw "The profile cannot be updated..";
    }
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//deleting profile
export const deleteProfile = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "Invalid Profile Id";
    }

    const profile = await Profile.findByIdAndRemove(req.params.id);
    if (!profile) {
      throw "Profile Not Found";
    }
    return res.status(200).json({
      success: true,
      message: " profile is deleted",
    });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};
