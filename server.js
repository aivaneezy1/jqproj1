import express from "express";
import dontenv from "dotenv";
import bodyParser from "body-parser";
dontenv.config();
import { taskRouter } from "./routes/task.js";
import { connectDB } from "./config/connectDb.js";
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.json());
const tasks = taskRouter;
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
