export const handleGetTask = async (id) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  try {
    const res = await axios.get(`/api/v1/tasks/${myParam}`);
    const { name, completed } = res.data;
    const taskList = $("#taskList");
    taskList.append(
      $("<li>").text(`${name} - ${completed}`).addClass("list-group-item")
    );
  } catch (err) {
    console.log(err);
  }
};

$(document).ready(handleGetTask);
