import { addPhoto } from "../store.js";
let form;
let radioBtns;
let radioHome;
let radioPlaces;
let captionInput;
let dateInput;
let photoInput;
let formState = {
  caption: null,
  date: null,
  photo: null,
};

function cacheDom() {
  form = document.getElementById("add-photo-form");
  radioBtns = document.querySelectorAll("input[type=radio]");
  radioHome = document.getElementById("rd-home");
  radioPlaces = document.getElementById("rd-places");
  captionInput = document.getElementById("inputCaption");
  dateInput = document.getElementById("inputDate");
  photoInput = document.getElementById("inputImg");
}

function bindEvents() {
  form.addEventListener("submit", (event) => {
    formState.id = Math.round(Math.random() * 100000);
    addPhoto(formState);
    event.preventDefault();
    form.reset();
  });
  radioHome.addEventListener("click", isHome);
  radioPlaces.addEventListener("click", isPlaces);
  captionInput.addEventListener("change", (event) => {
    updateFormState("caption", capitalize(event.target.value));
  });
  dateInput.addEventListener("change", (event) => {
    updateFormState("date", event.target.value);
  });
}

//update the formState values for caption, date and photo on 'change' event
function updateFormState(fieldName, value) {
  formState[fieldName] = value;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function isHome() {
  updateFormState("home", true);
}

function isPlaces() {
  updateFormState("home", false);
}

function initRadioBtn() {
  radioBtns.forEach((button) => {
    isHome();
    isPlaces();
  });
}

function init() {
  cacheDom();
  bindEvents();
  initRadioBtn();
}

const module = { init };
export default module;
