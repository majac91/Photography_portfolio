import "./styles/index.scss";
import "./icons/font/_flaticon.scss";

import carousel from "./js/modules/carousel.js";
import moduleDestinations from "./js/modules/list.js";
import addPhoto from "./js/modules/add_photo.js";

import "./js/modules/pubsub.js";

carousel.init();
moduleDestinations.init();
addPhoto.init();
