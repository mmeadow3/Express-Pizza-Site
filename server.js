"use strict";

const express = require("express");

const app = express(); /////creates instance of express server

const bodyParser = require("body-parser"); ////npm installed
const { cyan, red } = require('chalk') ////just for some styling

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

/////middleware  ////always above routes (except for error handling)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  console.log("Request made to:", req.url);  ////every request will make this fire
  next() /////this will make the process continue
})


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
app.get("/404", function (req, res){
  res.render("404") //////send page that contains 404 error message
})

/////error handling needs to go below the piping routes////////
///////error handling for 404 errors/////////
/////404 catch and then pass to error handling
app.use((req, res, next) => {
  const err = Error("Not Found")
  err.status = 404
  res.render("404")
  next(err)
})
////////////////////////////////////////////////
///////error handling for server 500 errors/////////
// app.use((err, req, res, next) => {
//   console.log("error occured");
//   // res.status(500).send("Internal Status Error")
//   res.sendStatus(err.status || 500)
// })
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
    res.sendStatus(err.status || 500)

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})
