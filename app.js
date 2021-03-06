import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import databaseConfig from "./config.js";
import profileRoute from "./src/routes/userProfileRoute.js";
import userRoute from "./src/routes/userRoute.js";
import projectRoute from "./src/routes/projectRoute.js";
import contactRoute from "./src/routes/contactRoute.js";
import githubRoute from "./src/routes/githubRoute.js";
import authJwt from "./src/middleware/authorize.js";
import errorHandler from "./src/middleware/validationError.js";
dotenv.config();
const port = process.env.PORT;
const api = process.env.API;
const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny")); //keeping log
app.use(authJwt());
app.use(errorHandler);

//enabling cors
app.use(cors());

//database connection
databaseConfig();

//routes
app.use(`${api}/profile`, profileRoute);
app.use(`${api}/user`, userRoute);
app.use(`${api}/project`, projectRoute);
app.use(`${api}/github`, githubRoute);
app.use(`${api}/contact`, contactRoute);

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
