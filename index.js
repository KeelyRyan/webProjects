import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});


app.post("/submit", (req, res) => {

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
