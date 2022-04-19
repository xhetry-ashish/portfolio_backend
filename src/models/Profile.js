import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  profileRole: {
    type: String,
    required: true,
  },
  profileTagline: {
    type: String,
    required: true,
  },
  facebookLink: {
    type: String,
  },

  instagramLink: {
    type: String,
  },

  linkedinLink: {
    type: String,
  },

  githubLink: {
    type: String,
  },
});

//making  model
const Profile = mongoose.model("profile", profileSchema);
export default Profile;
