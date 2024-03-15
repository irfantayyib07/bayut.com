"use strict";

// Radio Filter

const rentRadio = document.getElementById("rent");
const buyRadio = document.getElementById("buy");
const offPlanRadio = document.getElementById("offplan");

const rentLabel = document.getElementById("rent-label");
const buyLabel = document.getElementById("buy-label");
const offplanLabel = document.getElementById("offplan-label");

rentLabel.addEventListener("click", () => {
 rentLabel.classList.add("checked-radio-label");

 buyLabel.classList.remove("checked-radio-label");
 offplanLabel.classList.remove("checked-radio-label");
});

buyLabel.addEventListener("click", () => {
 buyLabel.classList.add("checked-radio-label");

 rentLabel.classList.remove("checked-radio-label");
 offplanLabel.classList.remove("checked-radio-label");
});

offplanLabel.addEventListener("click", () => {
 offplanLabel.classList.add("checked-radio-label");

 rentLabel.classList.remove("checked-radio-label");
 buyLabel.classList.remove("checked-radio-label");
});

// Drop Down Menu

const residentialLabel = document.getElementById("residential-label");
const dropdown = document.getElementById("dropdown");

residentialLabel.addEventListener("click", (e) => {
 dropdown.classList.remove("w-0", "h-0", "invisible");
});

// Changing Tabs

const category1Label = document.getElementById("category1-label");
const category2Label = document.getElementById("category2-label");
const category1Options = document.getElementById("category1-options");
const category2Options = document.getElementById("category2-options");

category1Options.classList.remove("w-0", "h-0", "invisible", "absolute");
category2Options.classList.add("w-0", "h-0", "invisible", "absolute");

category1Label.onclick = () => {
 category1Label.classList.add("selected-tab");
 category2Label.classList.remove("selected-tab");

 category1Options.classList.remove("w-0", "h-0", "invisible", "absolute");
 category2Options.classList.add("w-0", "h-0", "invisible", "absolute");
};

category2Label.onclick = () => {
 category2Label.classList.add("selected-tab");
 category1Label.classList.remove("selected-tab");

 category2Options.classList.remove("w-0", "h-0", "invisible", "absolute");
 category1Options.classList.add("w-0", "h-0", "invisible", "absolute");
};
