"use strict";

// RADIO BUTTONS

const radioButtonContainer = document.getElementById("radio-button-container");

radioButtonContainer.addEventListener("click", (e) => {
 if (e.target.tagName !== "LABEL") return;
 for (let elem of e.target.parentElement.children) elem.classList.remove("checked-radio-label");
 e.target.classList.add("checked-radio-label");
});

// TABS

const tabsContainer = document.getElementById("tabs-container");
const tabOptionsContainer = document.getElementById("tab-options-container");

for (let elem of tabOptionsContainer.children) {
 if (elem.id !== tabsContainer.children["category1-tab"].dataset.controls)
  elem.classList.add("w-0", "h-0", "invisible", "absolute");
}

tabsContainer.addEventListener("click", (e) => {
 if (e.target.tagName !== "BUTTON") return;
 for (let elem of e.target.parentElement.children) elem.classList.remove("selected-tab");
 e.target.classList.add("selected-tab");

 for (let elem of tabOptionsContainer.children) {
  elem.classList.add("w-0", "h-0", "invisible", "absolute");

  if (elem.id === e.target.dataset.controls) {
   elem.classList.remove("w-0", "h-0", "invisible", "absolute");
  }
 }
});

// DROPDOWN

const residentialLabel = document.getElementById("residential-label");
const dropdown = document.getElementById("dropdown");
const residentialSelect = document.getElementById("residential-select");
const selectToggle = document.getElementById("select-toggle");
const arrow = document.getElementById("arrow")

dropdown.addEventListener("click", (e) => {
 if (e.target.closest("#tab-options-container") && e.target.tagName === "SPAN") {
  selectToggle.checked = false;
  residentialLabel.childNodes[0].replaceWith(e.target.textContent);
  for (let option of residentialSelect.options) {
   if (option.textContent === e.target.textContent) option.selected = true;
  }

  for (let span of e.target.parentElement.children) {
   span.classList.remove("selected-option");
   if (span === e.target) e.target.classList.add("selected-option");
  }
 }

 if (e.target.id === "done-button") selectToggle.checked = false;
 if (e.target.id === "reset-button") {
  residentialSelect.value = null;
  residentialLabel.childNodes[0].replaceWith("Category1");
  selectToggle.checked = false;
  
  for (let span of tabOptionsContainer.children[0].children) {
   span.classList.remove("selected-option");
  }
 }
});

document.addEventListener("click", (e) => {
 if (!e.target.closest("#residential-container")) selectToggle.checked = false;

 if (selectToggle.checked) {
  dropdown.classList.remove("w-0", "h-0", "invisible");
  arrow.style.transform = "scaleY(-1)";
 } else {
  dropdown.classList.add("w-0", "h-0", "invisible");
  arrow.style.transform = "scaleY(1)";
 }
});
