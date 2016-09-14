"use strict";

const { Router } = require('express');
const router = Router()

const Contact  = require("../models/contact")
const Order = require("../models/order")
const Size = require("../models/size")
const Topping = require("../models/topping")


router.get('/', function (req, res) { //////getting the requested page
  res.render('index');  //////what will send on the page
  })
.get("/about", function (req, res){
  res.render("about", {title: "about"})
})
.get("/contact", function (req, res){
  res.render("contact", {title: "contact"})
})

router.get('/order', (req, res) =>
  Promise.all([
    Size.find().sort({ inches: 1}),
    Topping.find().sort({ name: 1})
  ]).then(([sizes, toppings]) => res.render('order', { page: 'Order', sizes, toppings })))

.post("/order", function (req, res, next){
  Order
  .create(req.body)
  .then(() => res.redirect('/'))
  .catch(next)
})

// const mongoose = require("mongoose");
// const Contact = mongoose.model("Contact"); /////referencing the model created in database.js


// router.post("/contact", function (req, res){
//   const msg = new Contact(req.body)
//   msg.save()
//   // console.log(req.body);
//   // res.send("Thanks for contacting us")
//   // db().collection("contact").insertOne(req.body)
//   .then(() => res.redirect("/"))
//   .catch(() => res.send("Error"))
// })

router.post('/contact', (req, res, next) => {
  Contact
  .create(req.body)
  .then(() => res.redirect('/'))
  .catch(next)   /////passing next will catch error object
})

router.get("/404", function (req, res){
  res.render("404") //////send page that contains 404 error message
})

module.exports = router
