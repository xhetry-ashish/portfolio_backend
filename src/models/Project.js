import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },

  github: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

//making  model
const Project = mongoose.model("project", projectSchema);
export default Project;
