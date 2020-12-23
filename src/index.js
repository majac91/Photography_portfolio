import "./styles/index.scss";
import "./icons/font/_flaticon.scss";

import editIcon from "./icons/png/edit1.png";
import addIcon from "./icons/png/016-add.png";
import closeIcon from "./icons/png/001-cancel-3.png";

import destinationsList from "./js/store.js";
import moduleDestinations from "./js/modules/list.js";
import moduleCarousel from "./js/modules/carousel.js";

import addPhoto from "./js/modules/add_photo.js";
import events from "./js/modules/pubsub.js";

const addBtn = document.querySelector(".btn__add");
const iconSpan = document.createElement("img");
addBtn.appendChild(iconSpan);
iconSpan.src = addIcon;

const closeBtn = document.querySelector(".form__close-btn");
const closeIconEl = document.createElement("img");
closeBtn.appendChild(closeIconEl);
closeIconEl.src = closeIcon;

moduleDestinations.init();
addPhoto.init();
