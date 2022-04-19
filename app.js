import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import databaseConfig from "./config.js";
import profileRoute from "./src/routes/userProfile.js";
dotenv.config();

const port = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny")); //keeping log

//enabling cors
app.use(cors());
app.options("*", cors());

//database connection
databaseConfig();

//routes
app.use(`${api}/user`, profileRoute);

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
