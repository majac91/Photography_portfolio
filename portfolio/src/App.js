import "./App.scss";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.js";
import Carousel from "./components/Carousel.js";
import Heading from "./components/Heading.js";
import GalleryDisplayLinks from "./components/GalleryDisplayButtons.js";
import Form from "./components/Form.js";

function App() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <Navbar className="navbar"></Navbar>
      <header className="header">
        <Carousel className="container--slideshow" />
        <Heading className="heading" />
      </header>
      <GalleryDisplayLinks setOpenForm={setOpenForm} openForm={openForm} />
      <Form setOpenForm={setOpenForm} openForm={openForm}></Form>
    </>
  );
}

export default App;
