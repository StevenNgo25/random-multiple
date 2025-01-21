const WHEEL_RADIUS = 400;
const TEXT_FONT_SIZE = 50;
let data = [
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Akhil",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Andy Y.",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Andy B.",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "David",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Davy",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Jonathan",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Leo",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Marcos",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Nick",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Tyler",
    id: generateGUID(),
  },
  {
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "Ver",
    id: generateGUID(),
  },
];

data = []
for(let num = 1; num <= 10; num++){
    data.push({
        fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
        text: num.toString(),
        id: generateGUID(),
    })
}
data.push({
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    text: "2000",
    id: null,
})

// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
  numSegments: 11, // Specify number of segments.
  outerRadius: WHEEL_RADIUS, // Set outer radius so wheel fits inside the background.
  textFontSize: TEXT_FONT_SIZE, // Set font size as desired.
  // Define segments including colour and text.
  segments: data,//data.sort(() => Math.random() - 0.5),
  // Specify the animation to use.
  animation: {
    type: "spinToStop",
    duration: 10,
    spins: 8,
    callbackFinished: alertPrize,
  },
});

data = []
for(let num = 1; num <= 2000; num++){
    data.push({
        fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
        text: num.toString(),
        id: generateGUID(),
    })
}

function generateGUID() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 36; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomizeSegments() {
  let segments = [];
}

const modal = document.getElementById("myModal");
function showPopup(text) {
  modal.style.display = "block";
  let resultText = modal.getElementsByClassName("result-text")[0];
  //console.log(resultText)
  resultText.innerHTML = text;
}

function hidePopup(text) {
  modal.style.display = "none";
}

const span = modal.getElementsByClassName("close")[0];
// Đóng popup khi click nút đóng
span.onclick = function () {
  modal.style.display = "none";
};

//js-delete-result
const btnDeleteResult = modal.getElementsByClassName("js-delete-result")[0];
// Đóng popup khi click nút đóng
btnDeleteResult.onclick = function () {
  modal.style.display = "none";

  const results = localStorage.getItem("resultText");
  JSON.parse(results).forEach((item, index) => {
    deleteName(item.id);
  });

  startSpin();
};

const resultsHistoryElement = document.querySelector(".result-history");
resultsHistoryElement.value = "CÁC KẾT QUẢ:\n";

const dsGiai = [
    {
      label: "Giải khuyến khích",
      value: 24
    },
    {
      label: "Giải khuyến khích",
      value: 20
    },

    {
      label: "Giải khuyến khích",
      value: 24
    },
    {
      label: "Giải khuyến khích",
      value: 20
    },

    {
      label: "Giải khuyến khích",
      value: 28
    },
    {
      label: "Giải khuyến khích",
      value: 20
    },


    {
      label: "Giải 3",
      value: 20
    },

    {
      label: "Giải 3",
      value: 20
    },
    {
      label: "Giải 3",
      value: 20
    },

    {
      label: "Giải nhì",
      value: 2
    },
    {
      label: "Giải nhất",
      value: 1
    },
    {
      label: "Giải đặc biệt",
      value: 1
    }
  ];
let countGiai = 0;
const labelGiai = document.querySelector(".label-giai");
// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
  // Do basic alert of the segment text.
  // You would probably want to do something more interesting with this information.
  const numResultInput = document.querySelector(".js-result-input");
  let numResult = Number(numResultInput.value) ?? 1;
  if (numResult == 0) numResult = dsGiai[countGiai].value;
  //if(Number(numResultInput) < 1) alert("Vui lòng nhập số lượng người trúng thưởng");
  const resultIds = getRandomResults(
    nameList.map((item) => item.id),
    numResult
  );
  const results = nameList.filter((item) => resultIds.includes(item.id));
  localStorage.setItem("resultText", JSON.stringify(results));
  resultsHistoryElement.value +=dsGiai[countGiai].label + ": " +
    results.map((item) => item.text).join(", ") + "\n\n";
  //alert("The winner is: " + results.join(', '));
  labelGiai.innerHTML = dsGiai[countGiai].label;
  showPopup('<span class="kq-item">'+results.map((item) => item.text).join('</span><span class="kq-item">')+'</span>');
  countGiai++;
  if(countGiai >= dsGiai.length) countGiai = 0;
  resetWheel();
}

function getRandomResults(array, numResults) {
  // Kiểm tra đầu vào
  if (!Array.isArray(array) || array.length === 0) {
    return []; // Trả về mảng rỗng nếu danh sách rỗng
  }
  if (numResults <= 0 || numResults > array.length) {
    numResults = array.length; // Lấy tất cả nếu numResults không hợp lệ
  }

  // Sao chép mảng để tránh thay đổi mảng gốc
  const newArray = [...array];
  const results = [];

  // Lấy ngẫu nhiên numResults phần tử
  for (let i = 0; i < numResults; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length);
    results.push(newArray.splice(randomIndex, 1)[0]);
  }

  return results;
}

// =======================================================================================================================
// Code below for the power controls etc which is entirely optional. You can spin the wheel simply by
// calling theWheel.startAnimation();
// =======================================================================================================================
let wheelPower = 2;
let wheelSpinning = false;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
  // Ensure that spinning can't be clicked again while already running.
  if (wheelSpinning == false) {
    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
  theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
  theWheel.draw(); // Call draw to render changes to the wheel.
  wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Name functionality.
// -------------------------------------------------------

let nameList = data
  .filter((segment) => segment != null && segment.id != null)
  .sort((a, b) => sortNames(a, b));

// -------------------------------------------------------
// Function for sort the list of names.
// -------------------------------------------------------
function sortNames(a, b) {
  if (a.text < b.text) {
    return -1;
  }
  if (a.text > b.text) {
    return 1;
  }
  return 0;
}

// -------------------------------------------------------
// Function for render the list of names.
// -------------------------------------------------------
function renderNames(todo) {
  localStorage.setItem("nameList", JSON.stringify(nameList));

  const list = document.querySelector(".js-name-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    if (item) item.remove();
    if (nameList.length === 0) list.innerHTML = "";
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <span>${todo.text}</span>
    <input class="delete-todo js-delete-todo" type="image" src="https://img.icons8.com/fluency/48/fa314a/delete-sign.png"/>
    `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

// -------------------------------------------------------
// Function for re-render the wheel after changes.
// -------------------------------------------------------
function renderWheel() {
  let showNameList =
    nameList.length > 10 ? getRandomResults(nameList, 10) : nameList;
  if (nameList.length > 10)
    showNameList.push({
      text: "2000",
      fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
      id: null,
    });
  //console.log(nameList.length)

  theWheel = new Winwheel({
    numSegments: showNameList.length, // Specify number of segments.
    outerRadius: WHEEL_RADIUS, // Set outer radius so wheel fits inside the background.
    textFontSize: TEXT_FONT_SIZE, // Set font size as desired.
    segments: showNameList,
    // Specify the animation to use.
    animation: {
      type: "spinToStop",
      duration: 10,
      spins: 8,
      callbackFinished: alertPrize,
    },
    //'drawPointer' : false
  });
}

// -------------------------------------------------------
// Function to add a name.
// -------------------------------------------------------
function addName(text) {
  const name = {
    text,
    fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
    id: this.generateGUID(),
  };

  nameList.push(name);
  renderWheel();
  renderNames(name);
}

// -------------------------------------------------------
// Function to delete a name.
// -------------------------------------------------------
function deleteName(key) {
  const index = nameList.findIndex((item) => item.id === key);
  const name = {
    deleted: true,
    ...nameList[index],
  };
  nameList = nameList.filter((item) => item.id !== key);
  renderNames(name);
  renderWheel();
}

// -------------------------------------------------------
// Event listener for submiting a name from the input.
// -------------------------------------------------------
const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-name-input");

  const text = input.value.trim();
  let isText = true;
  if (text.indexOf("-") > 0 && text.split("-").length == 2) {
    isText = false;
    const min = text.split("-")[0].trim();
    const max = text.split("-")[1].trim();
    //console.log(min, max);
    if (Number(min) && Number(max)) {
      this.deleteAll();
      for (let i = Number(min); i <= Number(max); i++) {
        addName("" + i);
      }
      input.value = "";
      input.focus();
    } else isText = true;
  }
  if (text !== "" && isText) {
    addName(text);
    input.value = "";
    input.focus();
  }
});

const btnReroll = document.querySelector(".js-reroll");
btnReroll.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "none";
  startSpin();
});

const btnReroll1 = document.querySelector(".js-reroll-1");
btnReroll1.addEventListener("click", (event) => {
  event.preventDefault();
  countGiai--;
  modal.style.display = "none";
  startSpin();
});

const btnDeleteAll = document.querySelector(".js-delete-all");
btnDeleteAll.addEventListener("click", (event) => {
  this.deleteAll();
});

function deleteAll(min, max) {
  //const index = nameList.findIndex(item => item.id === Number(key));
  nameList.forEach((item, index) => {
    const name = {
      deleted: true,
      ...nameList[index],
    };
    //nameList = nameList.filter(item => item.id !== Number(key));
    renderNames(name);
  });
  nameList = [];
  renderWheel();
}

// -------------------------------------------------------
// Event listener for deleting a name from the list.
// -------------------------------------------------------
const list = document.querySelector(".js-name-list");
list.addEventListener("click", (event) => {
  //console.log(event.target.classList);
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteName(itemKey);
  }
});

// -------------------------------------------------------
// Event listener for the page to load.
// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("nameList", JSON.stringify(nameList));
  const ref = localStorage.getItem("nameList");
  if (ref) {
    nameList = JSON.parse(ref);
    nameList.forEach((t) => {
      renderNames(t);
    });
  }
});

// -------------------------------------------------------
// Event listener for opening and closing the collapsible list.
// -------------------------------------------------------
var coll = document.getElementsByClassName("collapsible-button");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
