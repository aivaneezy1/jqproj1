import Task from "../models/TaskModel.js";

export const getAllTaks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getTask = async (req, res) => {
  // Task id
  const { id } = req.params;
  try {
    const task = await Task.findById({
      _id: id,
    });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${id}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await Task.create({
      name: name,
      completed: completed,
    });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        completed: completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateTask) {
      return res.status(404).json({ message: `No task with id: ${id}` });
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await Task.findByIdAndDelete({ _id: id });
    if (!deleteTask) {
      return res.status(404).json({ message: `No task with id: ${id}` });
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
