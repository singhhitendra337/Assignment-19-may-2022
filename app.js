let data;

const items = document.querySelector(".items");
const rightSide = document.querySelector(".right-side");
const rightText = document.querySelector(".right-text");

let lastPointer;
let currIdx = 0;

//Function to change right image and right text on clicking

const updateRightSide = () => {
  if (lastPointer) {
    lastPointer.children[1].style.color = "black";
    lastPointer.style.backgroundColor = "";
  }

  //console.log("id", index);

  const item = document.querySelector(`#l${currIdx}`);

  const leftImgText = item.querySelector("span");
  item.children[1].style.color = "white";
  item.style.backgroundColor = "blue";

  const info = data[currIdx];

  // console.log(info);

  const rightImg = document.querySelector(".right-image");

  rightImg.src = info.previewImage;

  rightText.value = info.title;

  lastPointer = item;
};

//Function to add items on the left side using the given data

const createLeftSide = (index, info) => {
  // console.log(index);
  const imgSrc = info.previewImage;
  const title = info.title;

  const item = document.createElement("li");
  const img = document.createElement("img");
  const text = document.createElement("span");

  item.classList.add("item");
  img.classList.add("item-image");
  text.classList.add("item-text");

  item.id = `l${index}`;
  text.innerText = minimizeString(title);
  img.src = imgSrc;

  console.log(index);

  item.addEventListener("click", () => {
    currIdx = index;
    //  console.log(currIdx);
    updateRightSide();
  });

  item.appendChild(img);
  item.appendChild(text);
  items.appendChild(item);

  if (index == 0) updateRightSide();
};

//Function to change the left text when editing the right text

const updateRightText = (newValue) => {
  const item = document.querySelector("#l" + currIdx);
  data[currIdx].title = newValue;

  leftImageTitle = item.querySelector("span");
  leftImageTitle.innerText = minimizeString(newValue);
  // console.log(itemData);
};

//Functions to handle arrow key movements

const shiftUp = () => {
  if (currIdx === 0) currIdx = data.length - 1;
  else currIdx = currIdx - 1;
  updateRightSide();
};

const shiftDown = () => {
  if (currIdx == data.length - 1) currIdx = 0;
  else currIdx = currIdx + 1;
  updateRightSide();
};

//Function to limit the size of the left text to 29 characters

const minimizeString = (string) => {
  let newString = "";
  const len = string.length;
  if (len > 31) {
    for (let i = 0; i < 13; i++) newString += string[i];
    newString += "...";
    for (let i = len - 13; i < len; i++) newString += string[i];
    // console.log(newString);
    return newString;
  }

  return string;
};

//Driver Function to call other functions

const callingFunctions = () => {
  for (let i = 0; i < data.length; i++) {
    createLeftSide(i, data[i]);
  }

  rightText.addEventListener("input", (event) => {
    updateRightText(rightText.value);
  });

  document.onkeydown = (event) => {
    if (event.key === "ArrowUp") shiftUp();
    else if (event.key === "ArrowDown") shiftDown();
  };
};

//Fetching of data from JSON file

fetch("./Data.json")
  .then((res) => {
    return res.json();
  })
  .then((Data) => {
    data = Data;
    callingFunctions();
  })
  .catch((error) => {
    console.log("Unable to fetch the data");
  });
