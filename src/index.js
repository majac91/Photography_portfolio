import "./styles/index.scss";
import destinationsList from "./js/store.js";
import moduleDestinations from "./js/modules/list.js";
import moduleCarousel from "./js/modules/carousel.js";
import addPhoto from "./js/modules/add_photo.js";
import events from "./js/modules/pubsub.js";
moduleDestinations.init();
addPhoto.init();
