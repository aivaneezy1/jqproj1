const editButton = (id) => {
  return $("<a>")
    .attr("href", `edit.html?id=${id}`)
    .append(
      $("<button>")
        .text("Edit")
        .addClass(" text-center btn btn-success  my-2 w-100")
    );
};

const deleteButton = () => {
  return $("<button>").text("Delete").addClass("btn btn-danger flex-grow-1");
};

const renderTask = (task) => {
  console.log("render", task);
  const taskList = $("#tasksList");

  const anchor = $("<a>")
    .attr("href", `task.html?id=${task._id}`)
    .text(`${task.name} - ${task.completed}`);

  const taskItem = $("<li>")
    .addClass("d-flex flex-column list-group-item")
    .append(anchor);

  const buttonContainer = $("<div>").addClass(
    "d-flex flex-row justify-between-center align-items-center w-100"
  );
  const editBtn = editButton(task._id);
  buttonContainer.append(editBtn);
  taskItem.append(editBtn);

  const deleteBtn = deleteButton();
  deleteBtn.click(() => deleteTask(task._id, taskItem));
  buttonContainer.append(deleteBtn);
  taskItem.append(deleteBtn);

  taskList.append(taskItem);
};

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

    renderTask(res.data);
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

    console.log("ta=ls", tasks);
    tasks.map((task, id) => {
      console.log("task", task);
      renderTask(task);
    });
  } catch (err) {
    console.log(err);
  }
};
$(document).ready(handleGetAllTask);

const deleteTask = async (id, taskItem) => {
  try {
    const res = await axios.delete(`/api/v1/tasks/${id}`);
    if (res.status == 200) {
      taskItem.remove();
    }
  } catch (err) {
    console.log(err);
  }
};
