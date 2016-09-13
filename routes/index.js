"use strict";

const { Router } = require('express');
const router = Router()

const { db }= require("../database")

router.get('/', function (req, res) { //////getting the requested page
  res.render('index');  //////what will send on the page
  })
.get("/about", function (req, res){
  res.render("about", {title: "about"})
})
.get("/contact", function (req, res){
  res.render("contact", {title: "contact"})
})
.post("/contact", function (req, res){
  // console.log(req.body);
  // res.send("Thanks for contacting us")
  db().collection("contact").insertOne(req.body)
  .then(() => res.redirect("/"))
  .catch(() => res.send("Error"))
})
router.get("/404", function (req, res){
  res.render("404") //////send page that contains 404 error message
})

module.exports = router
