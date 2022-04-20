import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: string,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },

    contact: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//making  model
const User = mongoose.model("user", userSchema);
export default User;
