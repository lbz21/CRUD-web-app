require("dotenv").config();
console.log(process.env.PORT);
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const noteController = require("./controllers/note");

const app = express();

app.set("view engine", "ejs");
const { WEB_PORT, ATLAS_URI  } = process.env;

//connecting to mongo database
mongoose.connect(ATLAS_URI, { useNewUrlParser: true },  { useUnifiedTopology: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});





//applying the middlewear

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/what-I-do", (req, res) => {
  res.render("what-I-do");
});

app.get("/index", (req, res) => {
  res.render("index");
});


app.get("/create-note", (req, res) => {
  res.render("create-note", { errors: {} });
});

app.get("/update-note",(req, res)=> {
  res.render("update-note");

})


app.post("/create-note", noteController.create);



app.get("/notes", noteController.list);
app.get("/notes/delete/:id", noteController.delete);
app.get("notes/update/:id", noteController.edit);
app.post("notes/update/:id", noteController.update);




app.listen(WEB_PORT, () => {
  console.log(`The server application is listening at http://localhost:${WEB_PORT}`);
});
