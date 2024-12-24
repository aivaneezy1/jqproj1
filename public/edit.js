const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
const handleEditTask = async () => {
  const editName = $("input[type=text][name=editName]").val();
  const completed = $("input[type=checkbox][name=editCompleted]:checked").val();

  try {
    await axios.patch(`/api/v1/tasks/${myParam}`, {
      name: editName,
      completed: completed ? true : false,
    });
  } catch (err) {
    console.log(err);
  }
};

$(".editTask").click(() => handleEditTask());

const handleGetTask = async () => {
  $("span").text(myParam);
  try {
    const res = await axios.get(`/api/v1/tasks/${myParam}`);
    const { name, completed } = res.data;
    const val = $("#editName").attr("placeholder", name);
    if (completed) {
      // Make checkbox value checked
      $("#editCompleted").attr("checked", "checked");
    }
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(handleGetTask);
