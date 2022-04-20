import mongoose from "mongoose";
import Profile from "../models/profile.js";

//getting a profile using id
export const getSingleProfile = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Profile Id..");
  }

  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    res.status(500).json({ success: false });
  }
  res.send(profile);
};

//get all profiles
export const getAllProfiles = async (req, res) => {
  const profile = await Profile.find();
  if (!profile) {
    res.status(500).json({ success: false });
  }
  res.send(profile);
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

  profiledata = await profiledata.save();
  if (!profiledata) {
    res.status(500).json({
      success: false,
      message: "Profile cannot be created..",
    });
  }

  res.status(200).send(profiledata);
};

//editing profile
export const editProfile = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Profile Id..");
  }

  let profiledata = await Profile.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      profileRole: req.body.profileRole,
      profileTagline: req.body.profileTagline,
      facebookLink: req.body.facebookLink,
      instagramLink: req.body.instagramLink,
      githubLink: req.body.githubLink,
      linkedinLink: req.body.linkedinLink,
    },
    { new: true }
  );

  if (!profiledata)
    return res.status(400).send("The profile cannot be updated..");

  res.status(200).send(profiledata);
};

//deleting profile
export const deleteProfile = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Profile Id..");
  }

  const profile = await Profile.findByIdAndRemove(req.params.id);
  if (!profile) {
    res.status(500).json({ success: false });
  }
  return res.status(200).json({
    success: true,
    message: " profile is deleted..",
  });
};
