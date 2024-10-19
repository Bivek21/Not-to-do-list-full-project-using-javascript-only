let taskList = [];

const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  // e.preventDefault();
  //   e.preventDefault();
  //   const elm = document.getElementById("task");

  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = +newForm.get("hr");
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  //check if there is enough hours left
  const existingTotalHrs = taskTotal();
  if (existingTotalHrs + hr > hoursPerWeek) {
    return alert(
      `sorry Boss not enough hours to complete the task"${
        hoursPerWeek - existingTotalHrs
      } hours remaining for this weeks`
    );
  }
  taskList.push(obj);
  displayEntryList();
  displayBadList();
};

const displayEntryList = () => {
  let str = "";
  // console.log(taskList);

  const entryElm = document.getElementById("entryList");
  if (!entryElm) return;
  const entryList = taskList.filter((item) => item.type === "entry");
  entryList.map((item, i) => {
    str += `  <tr>
    <td>${i + 1}</td>
      <td>${item.task}</td>
       <td>${item.hr}</td>
       <td>hrs</td>
       <td class="text-end">
        <button onClick="switchTask('${
          item.id
        }','bad')" class="btn btn-success">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
     <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
         </button>
   </td>
 </tr>`;
  });
  entryElm.innerHTML = str;
  taskTotal();
};
const displayBadList = () => {
  let str = "";
  // console.log(taskList);

  const badElm = document.getElementById("badList");
  if (!badElm) return;

  const badList = taskList.filter((item) => item.type === "bad");
  badList.map((item, i) => {
    str += `  <tr>
    <td>${i + 1}</td>
      <td>${item.task}</td>
       <td>${item.hr}</td>
       <td>hrs</td>
       <td class="text-end">
        <button onClick="switchTask('${
          item.id
        }','bad')" class="btn btn-success">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
     <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
         </button>
   </td>
 </tr>`;
  });
  badElm.innerHTML = str;
  document.getElementById("savedHrsElm").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};

const randomIdGenerator = (length = 6) => {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length); //0to69.99
    id += str[randomIndex];
  }
  return id;
};

const handleOnDelete = (id) => {
  if (window.confirm("are you sure you want to delete this?"))
    //   console.log(id);
    taskList = taskList.filter((item) => item.id !== id);
  displayEntryList();
  displayBadList();
};
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = item.type === "entry" ? "bad" : "entry";
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};

const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("ttlHrs").innerText = ttlHr;
  return ttlHr;
};
