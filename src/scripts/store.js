import events from "./modules/pubsub";
import { mscConfirm } from "medium-style-confirm";
import Parse from "parse";
import "medium-style-confirm/css/msc-style.css";

Parse.initialize(
  "vmgVvg3aF82Lhxcm97idm9UCLJGSHcvEzLmXxD22",
  "0ZzBp7Szs8vOyijUakZHud8WaxnT1taYtVKSJ6Ha"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const Gallery = Parse.Object.extend("Gallery");
const gallery = new Gallery();
const query = new Parse.Query(Gallery);

//get a list from server and publish
export async function retreiveList() {
  query.equalTo("home", true);
  const homeQuery = await query.find();

  query.equalTo("home", false);
  const placesQuery = await query.find();

  const destList = [...homeQuery, ...placesQuery];

  const retreivedList = [];

  for (let i = 0; i < destList.length; i++) {
    let object = destList[i];
    let caption = object.get("caption");
    let date = object.get("date");
    let home = object.get("home");
    let photo = object.get("photo").url();
    let id = object.get("photoId");
    let listItem = { caption, date, home, photo, id };
    retreivedList.push(listItem);
  }

  events.publish("listRetreived", retreivedList);
  return retreivedList;
}

retreiveList();

//add new item
export async function addPhoto(newItem) {
  //create the file and upload to server
  const fileInput = document.getElementById("inputImg");
  const selectedFiles = [...fileInput.files];
  const file = selectedFiles[0];
  const name = "photo.jpg";
  const parseFile = new Parse.File(name, file);

  //save item
  try {
    await gallery.save({
      caption: newItem.caption,
      date: newItem.date,
      home: newItem.home,
      photo: parseFile,
      photoId: newItem.id,
    });
    console.log("The object was added successfully.");
    retreiveList();
  } catch (error) {
    console.log(error);
  }
}

//check/uncheck an item from a list
export async function toggleButtonHome(item) {
  const home = item.home;
  item.home = !home;

  const query = new Parse.Query(Gallery);
  query.equalTo("photoId", item.id);
  const updateQuery = await query.find();

  try {
    const object = await updateQuery[0].set("home", item.home).save();
    console.log("The object was updated successfully.");
    setTimeout(retreiveList, 1000);
  } catch (error) {
    console.log(error);
  }
}

//delete an item
export async function deleteItem(item) {
  const query = new Parse.Query(Gallery);
  query.equalTo("photoId", item.id);
  const deleteQuery = await query.find();

  if (
    mscConfirm("Delete photo?", async function () {
      try {
        const object = await deleteQuery[0].destroy();
        console.log("The object was deleted successfully.");
      } catch (e) {
        console.log("Delete failed!", error);
      }
      retreiveList();
    })
  );
}
