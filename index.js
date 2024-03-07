import express from "express";
import bodyParser from "body-parser";
import {alert} from "node-popup";

const app = express();
const port = 3500;
let x  = 1;
const postsList  = [];
const data = {
  posts: postsList  };
const userName = "Admin";
const password = "passwordAdmin";
let attemptName = ""; 
let attemptPassword = "";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    posts: postsList  };
    if (attemptName){
      res.render("member.ejs", data);
    }else{
    res.render("index.ejs", data);
    }
});

app.post("/login", (req, res) => {
  try{
  attemptName = (req.body["loginName"]);
  attemptPassword = (req.body["loginPassword"]);
  //console.log(attemptName, attemptPassword);
  if(attemptName == userName && attemptPassword == password){
    res.render("member.ejs", data);
  }else {
    // alert('Login Failed. Please check username and password.');  
    // next(); 
  }
}catch{
  res.send("Internal server error");
}
}); 

app.get("/about", (req, res) => {
  var pageName = { name: "/about"};
  res.render("about.ejs", pageName);
});
 
app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});


app.post("/submit", (req, res) => {
  try{
  const userName = (req.body["inputName"]);
  const userEmail = (req.body["inputEmail"]);
  const newTitle = (req.body["inputTitle"]);
  const newPost = (req.body["inputPost"]);
  const post = {postId:x, user:userName, email:userEmail, postTitle: newTitle, postBody:newPost};
  postsList.push(post);

  x ++; 
  res.render("readPost.ejs", {post});
}catch{
  res.send("Internal server error please refresh the page.");
}
});

app.get("/newPost/:id", (req, res) => {
  res.render("newPost.ejs");
  try{
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  post.userName = (req.body["inputName"]);
  post.userEmail = (req.body["inputEmail"]);
  post.newTitle = (req.body["inputTitle"]);
  post.newPost = (req.body["inputPost"]);
}catch{
  res.send("Internal server error please refresh the page.");
}
});

app.get("/updatePost/:id", (req, res) => {
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  res.render("updatePost.ejs", {post});
});

app.get("/readPost/:id", (req, res) => {
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  res.render("readPost.ejs", {post});
});

app.post("/update/:id", (req, res) => {
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  if(req.body["inputTitle"]){
  post.postTitle = req.body["inputTitle"]}
  if (req.body["inputPost"]){
  post.postBody = (req.body["inputPost"]); }
  //console.log(postsList[postId-1], post.postBody, );
  res.render("readPost.ejs", {post});
});

app.get("/delete/:id", (req, res) => {
  
  var postId = parseInt(req.params.id);
  var post = postsList.find(post => post.postId === postId);
  var index = postsList.indexOf(post);
  postsList.splice(index, 1);

  if (attemptName && attemptPassword){
    res.render("member.ejs", data);
  }else{
  res.render("index.ejs", data);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  
});

