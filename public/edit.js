const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
const handleEditTask = async () => {
  const editName = $("input[type=text][name=editName]").val();
  const completed = $("input[type=checkbox][name=editCompleted]:checked").val();

  try {
    const res = await axios.patch(`/api/v1/tasks/${myParam}`, {
      name: editName,
      completed: completed ? true : false,
    });
    console.log("res", res.request);
    console.log("status", res.status);
    if (res.status == 200) {
      window.location.href = "/"; // redirect user to homepage
    }
  } catch (err) {
    console.log(err);
  }
};

$(".editTask").click(() => handleEditTask());

const handleGetTask = async () => {
  $("span").text(myParam).addClass("text-secondary");
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
