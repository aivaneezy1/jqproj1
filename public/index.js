const handlePostReq = async () => {
  const taskName = $("input[type=text][name=taskName]").val();
  const completed = $("input[type=checkbox][name=checkBox]:checked").val();

  if (!taskName) {
    return;
  }
  try {
    // Post the new task to the server
    const res = await axios.post("/api/v1/tasks", {
      name: taskName,
      completed: completed ? true : false,
    });

    const task = res.data.task;
    const taskList = $("#tasksList");
    // Create a new list item for the task
    const anchor = $("<a>")
      .attr("href", `task.html?id=${task._id}`)
      .text(`${task.name} - ${task.completed}`);
    const listItem = $("<li>").append(anchor);

    const editButton = $("<a>")
      .attr("href", `edit.html?id=${task._id}`)
      .append($("<button>").text("Edit"));
    listItem.append(editButton);

    const deleteButton = $("<button>").text("Delete");
    deleteButton.addClass("test");
    listItem.append(deleteButton);

    // Append the new task to the task list
    taskList.append(listItem);

    // Attach the task._id to the delete button's click event
    deleteButton.click(() => deleteTask(task._id));

    // Clear the input fields after adding the task
    $("input[type=text][name=taskName]").val("");
    $("input[type=checkbox][name=checkBox]").prop("checked", false);
  } catch (err) {
    console.log(err);
  }
};

$(".addTask").on("click", (e) => {
  e.preventDefault();
  handlePostReq();
});

const handleGetAllTask = async () => {
  try {
    const res = await axios.get("/api/v1/tasks");
    const tasks = res.data;
    const taskList = $("#tasksList");

    tasks.map((task, id) => {
      const anchor = $("<a>")
        .attr("href", `task.html?id=${task._id}`)
        .text(`${task.name} - ${task.completed}`);
      taskList.append($("<li>").append(anchor));

      const editButton = $("<a>")
        .attr("href", `edit.html?id=${task._id}`)
        .append($("<button>").text("Edit"));
      taskList.append(editButton);

      const deleteButton = $("<button>").text("Delete");
      deleteButton.addClass("test");
      taskList.append(deleteButton);

      // Attach the task._id to the delete button's click event
      deleteButton.click(() => deleteTask(task._id));
    });
  } catch (err) {
    console.log(err);
  }
};
$(document).ready(handleGetAllTask);

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`/api/v1/tasks/${id}`);
    console.log("res", res);
  } catch (err) {
    console.log(err);
  }
};
