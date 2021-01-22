import React, { useState, createRef } from "react";
import closebtn from "../icons/png/001-cancel-3.png";
import Parse from "parse";

export default function Form({ isFormOpen, onCloseForm, onSubmitForm }) {
  const [caption, setCaption] = useState("caption");
  const [date, setDate] = useState("date");
  const [url, setUrl] = useState();
  const [location, setLocation] = useState();
  const fileInput = createRef();

  const handleFileInput = (e) => setUrl(fileInput.current); //TODO fix photo path
  const handleCaptionInput = (e) => setCaption(e.target.value);
  const handleDateInput = (e) => setDate(e.target.value);

  const handleRadioBtns = (e) => {
    if (e.target.value === "Home") {
      setLocation(true);
    } else {
      setLocation(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPhoto();
  };

  async function addPhoto() {
    const Gallery = Parse.Object.extend("Gallery");
    const gallery = new Gallery();
    const fileInput = document.getElementById("inputImg");
    const selectedFiles = [...fileInput.files];
    const file = selectedFiles[0];
    const parseFile = new Parse.File("photo.jpg", file);

    // const base64 = window.btoa(url);
    // const parseFile = new Parse.File("photo.jpg", { base64: base64 });

    try {
      await gallery.save({
        caption: caption,
        date: date,
        home: location,
        photo: parseFile,
        photoId: Math.round(Math.random() * 100000),
      });
      console.log("The object was added successfully.");
      onSubmitForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      id="add-photo-form"
      className={`form ${
        isFormOpen ? "add-photo-form--open" : "add-photo-form--closed"
      }`}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="inputCaption" className="form__label">
        Caption
      </label>
      <input
        type="text"
        name="text"
        id="inputCaption"
        onChange={handleCaptionInput}
        value={caption}
        required
        className="form__input"
      />
      <label htmlFor="inputDate" className="form__label">
        Date
      </label>
      <input
        type="date"
        name="text"
        id="inputDate"
        onChange={handleDateInput}
        value={date}
        required
        className="form__input"
      />
      <label className="form__label" htmlFor="inputImg">
        Photo
      </label>
      <input
        // onChange={handleFileInput}
        type="file"
        id="inputImg"
        ref={fileInput}
        required
        className="form__input form__input-img"
      />
      <div onChange={handleRadioBtns} className="radio-btns">
        <input id="rd-home" name="btn" type="radio" value="Home" />
        <label htmlFor="rd-home" className="radio-label">
          Home
        </label>
        <input id="rd-places" name="btn" type="radio" value="Places" />
        <label htmlFor="rd-places" className="radio-label">
          Places
        </label>
      </div>
      <button type="submit" id="upload" className="form__submit-btn">
        Upload
      </button>
      <button
        onClick={onCloseForm}
        type="button"
        id="close"
        className="form__close-btn"
      >
        <img alt="add-button" src={closebtn}></img>
      </button>
    </form>
  );
}
