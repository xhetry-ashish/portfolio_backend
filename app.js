import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny")); //keeping log

//enabling cors
app.use(cors());
app.options("*", cors());

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
