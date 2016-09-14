"use strict";

const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://localhost:27017/pugspizza"  //////need to make a new db every project
// let db    //////declare db here, then rename it below so it can be reused

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
// .then(mydb => db = mydb)






// module.exports.db = () => db
