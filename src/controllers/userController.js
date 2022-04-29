import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//getting a user using id
export const getSingleUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw "Invalid User Id";
    }
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      throw "User Id Not found";
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("-passwordHash");
    if (!user) {
      throw "No users Found";
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//creating user
export const addUser = async (req, res) => {
  let userdata = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    address: req.body.address,
    contact: req.body.contact,
  });
  try {
    userdata = await userdata.save();
    if (!userdata) {
      throw err;
    }

    res.status(200).json({ success: true, data: userdata });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const secret = process.env.secret;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw "Username Not found";
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        secret,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({ success: true, user: user.username, token: token });
    } else {
      throw "Password is Wrong";
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//editing user
export const editUser = async (req, res) => {
  let userdata = {
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    address: req.body.address,
    contact: req.body.contact,
  };
  try {
    let user = await User.findByIdAndUpdate(req.params.id, userdata, {
      new: true,
    });
    if (!user) {
      throw "User cannot be updated";
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
