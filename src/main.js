import destinationsList from "./scripts/store.js";
import moduleDestinations from "./scripts/modules/list.js";
import moduleCarousel from "./scripts/modules/carousel.js";
import addNewCity from "./scripts/modules/add_destination.js";
import events from "./scripts/modules/pubsub.js";
moduleDestinations.init();
addNewCity.init();
