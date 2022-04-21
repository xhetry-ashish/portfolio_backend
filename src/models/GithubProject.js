import mongoose from "mongoose";

const githubSchema = mongoose.Schema({
  projectname: {
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
  githubLink: {
    type: String,
  },
  dateCreated: {
    type: Date,
  },
});

//making  model
const Github = mongoose.model("github", githubSchema);
export default Github;
