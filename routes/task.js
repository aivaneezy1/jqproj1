import express from "express";
import {
  getAllTaks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.js";
const router = express.Router();

router.route("/").get(getAllTaks); // - Get all task
router.route("/:id").get(getTask); // - Get single task
router.route("/").post(createTask); // - Create a new task
router.route("/:id").delete(deleteTask); // - Delete a task
router.route("/:id").patch(updateTask); // -Update a task
export { router as taskRouter };
//
