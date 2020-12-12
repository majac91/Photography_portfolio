import destinationsList from "./js/store.js";
import moduleDestinations from "./js/modules/list.js";
import moduleCarousel from "./js/modules/carousel.js";
import addPhoto from "./js/modules/add_photo.js";
import events from "./js/modules/pubsub.js";
moduleDestinations.init();
addPhoto.init();

import "./styles/index.scss";
import "./icons/font/_flaticon.scss";

import slide1 from "./images/photo0.JPG";
import slide2 from "./images/photo1.JPG";
import slide3 from "./images/photo8.JPG";
import slide4 from "./images/photo25.JPG";

import downArrow from "./icons/png/next.png";

const firstSlide = document.querySelector(".slide-1 img");
firstSlide.src = slide1;
const secondSlide = document.querySelector(".slide-2 img");
secondSlide.src = slide2;
const thirdSlide = document.querySelector(".slide-3 img");
thirdSlide.src = slide3;
const fourthSlide = document.querySelector(".slide-4 img");
fourthSlide.src = slide4;
const scrollDown = document.querySelector(".heading__scroll-icon");
scrollDown.src = downArrow;
