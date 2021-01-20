import React, { useState, useEffect, createRef, useLayoutEffect } from "react";
import closebtn from "../icons/png/001-cancel-3.png";
import Parse from "parse";

export default function Form({
  setGalleryItem,
  galleryItem,
  setOpenForm,
  openForm,
}) {
  const [caption, setCaption] = useState("caption");
  const [date, setDate] = useState("date");
  const [url, setUrl] = useState();
  const [location, setLocation] = useState();
  //   const [galleryList, setGalleryList] = useState([]);
  const fileInput = React.createRef();

  const handleCaptionInput = (e) => setCaption(e.target.value);
  const handleDateInput = (e) => setDate(e.target.value);
  const handleFileInput = (e) => setUrl(fileInput.current.files[0].name);

  const handleRadioBtns = (e) => {
    if (e.target.value === "Home") {
      setGalleryItem({ ...galleryItem, home: true });
      setLocation(true);
    } else {
      setGalleryItem({ ...galleryItem, home: false });
      setLocation(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(galleryItem);
    addPhoto();
  };

  useEffect(() => {
    setGalleryItem({
      ...galleryItem,
      caption: caption,
      photoId: Math.round(Math.random() * 100000),
      url: url,
      date: date,
    });
  }, [caption, url, date]);

  async function addPhoto() {
    const Gallery = Parse.Object.extend("Gallery");
    const gallery = new Gallery();
    const base64 = window.btoa(url);
    const parseFile = new Parse.File("photo.jpg", { base64: base64 });

    try {
      await gallery.save({
        caption: caption,
        date: date,
        home: location,
        photo: parseFile,
        photoId: galleryItem.photoId,
      });
      console.log("The object was added successfully.");
    } catch (error) {
      console.log(error);
    }
  }

  //   async function retreiveList() {
  //     const Gallery = Parse.Object.extend("Gallery");
  //     const query = new Parse.Query(Gallery);
  //     query.equalTo("home", true);
  //     const homeQuery = await query.find();

  //     query.equalTo("home", false);
  //     const placesQuery = await query.find();

  //     const destList = [...homeQuery, ...placesQuery];

  //     const retreivedList = [];

  //     for (let i = 0; i < destList.length; i++) {
  //       let object = destList[i];
  //       let caption = object.get("caption");
  //       let date = object.get("date");
  //       let home = object.get("home");
  //       let photo = object.get("photo").url();
  //       let id = object.get("photoId");
  //       let listItem = { caption, date, home, photo, id };
  //       retreivedList.push(listItem);
  //     }
  //     setGalleryList(retreivedList);
  //   }

  return (
    <form
      id="add-photo-form"
      className={`form ${
        openForm ? "add-photo-form--open" : "add-photo-form--closed"
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
        type="file"
        id="inputImg"
        onChange={handleFileInput}
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
        onClick={() => setOpenForm(!openForm)}
        type="button"
        id="close"
        className="form__close-btn"
      >
        <img alt="add-button" src={closebtn}></img>
      </button>
    </form>
  );
}
