"use strict";

const express = require("express");

const app = express(); /////creates instance of express server

const bodyParser = require("body-parser"); ////npm installed

// PORT=1337 node server.js   in terminal to set temporary port
const port = process.env.PORT || 3000
app.set("port", port)


app.set('view engine', 'pug');

if (process.env.NODE_ENV !== "production"){
app.locals.pretty = true
}
// app.set("views", "views");   /////dont need this bc views is default

//////this makes a global variable for all pages to use
app.locals.company = "Pugs Pizza"
/////////////////

/////middleware  ////always above routes
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))


/////routes
// app.get("/", (req, res) =>
//   res.send(`<h1>Welcome to my app</h1>`)
// )
///////http localhost:3000 //// can run this in terminal to find out what text says
app.get('/', function (req, res) { //////getting the requested page
  res.render('index');  //////what will send on the page
  })
.get("/about", function (req, res){
  res.render("about", {title: "about"})
})
.get("/contact", function (req, res){
  res.render("contact", {title: "contact"})
})
.post("/contact", function (req, res){
  console.log(req.body);
  // res.send("Thanks for contacting us")
  res.redirect("/")
})


const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})
