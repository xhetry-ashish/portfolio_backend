import mongoose from "mongoose";
import mailSender from "../helper/mailSent.js";
import Contact from "../models/Contact.js";

//getting all messages
export const getMessage = async (req, res) => {
  try {
    let contact = await Contact.find();
    if (!contact) {
      throw "No Contacts Found";
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

//sending and storing message
export const sendMessage = async (req, res) => {
  let contact = new Contact({
    username: req.body.username,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    let data = await contact.save();
    if (!data) {
      throw error;
    }
    mailSender(data.email, data.username, data.message);
    res.status(200).json({ mailSent: true, data: data });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};
