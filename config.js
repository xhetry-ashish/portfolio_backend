import mongoose from "mongoose";

//database connection

const databaseConfig = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING_ATLAS)
    .then(() => {
      console.log("Database Connection Ready...");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default databaseConfig;
