const handlePostReq = async () => {
  const taskName = $("input[type=text][name=taskName]").val();
  const completed = $("input[type=checkbox][name=checkbox]:checked").val();
  if (!taskName) {
    return;
  }
  try {
    await axios.post("/api/v1/tasks", {
      name: taskName,
      completed: completed ? true : false,
    });
  } catch (err) {
    console.log(err);
  }
};
$(".addTask").click(() => handlePostReq());

const handleGetAllTask = async () => {
  try {
    const res = await axios.get("/api/v1/tasks");
    const tasks = res.data;
    const taskList = $("#taskList");
    tasks.forEach((task) => {
      taskList.append(
        $("<li>").append(
          $("<a>")
            .attr("href", "/test")
            .text(`${task.name} - ${task.completed}`)
        )
      );
      taskList.append($("<button>").text("Edit"));
      taskList.append($("<button>").text("Delete"));
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(handleGetAllTask());
