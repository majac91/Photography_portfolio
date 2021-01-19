import "./App.scss";
import Navbar from "./components/Navbar.js";
import Carousel from "./components/Carousel.js";
import Heading from "./components/Heading.js";
import GalleryDisplayLinks from "./components/GalleryDisplayButtons.js";
import Form from "./components/Form.js";

function App() {
  return (
    <>
      <Navbar className="navbar"></Navbar>
      <header className="header">
        <Carousel className="container--slideshow" />
        <Heading className="heading" />
      </header>
      <GalleryDisplayLinks />
      <Form></Form>
    </>
  );
}

export default App;
