import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let x  = 1;
const postsList  = [];
const data = {
  posts: postsList  };

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    posts: postsList  };
    res.render("index.ejs", data);
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});


app.post("/submit", (req, res) => {
  const userName = (req.body["inputName"]);
  const userEmail = (req.body["inputEmail"]);
  const newTitle = (req.body["inputTitle"]);
  const newPost = (req.body["inputPost"]);
  const addNewPost = {postId:x, user:userName, email:userEmail, postTitle: newTitle, postBody:newPost};
  postsList.push(addNewPost);

  x ++; 
  res.render("postConfirm.ejs", addNewPost);
});

app.get("/newPost/:id", (req, res) => {
  res.render("newPost.ejs");
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  post.userName = (req.body["inputName"]);
  post.userEmail = (req.body["inputEmail"]);
  post.newTitle = (req.body["inputTitle"]);
  post.newPost = (req.body["inputPost"]);

});

app.get("/post/:id", (req, res) => {
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  res.render("readPost.ejs", {post});
});

app.post("/update/:id", (req, res) => {
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  if(req.body["inputTitle"]){
  post.postTitle = (req.body["inputTitle"]); }
  if (req.body["inputPost"]){
  post.postBody = (req.body["inputPost"]); }
  console.log(postsList[postId-1], post.postBody, post.postTitle);
  res.render("postConfirm.ejs");
});

app.get("/delete/:id", (req, res) => {
  
  var postId = parseInt(req.params.id);
  var post = postsList.pop(post => post.postId === postId);
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  
});

